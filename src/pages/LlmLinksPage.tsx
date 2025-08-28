// src/pages/LlmLinksPage.tsx

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Link, RefreshCw } from 'lucide-react';
import { LlmLinkCard } from '@/components/LlmLinkCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NewLinkForm } from '@/components/NewLinkForm';
import { useLlmLinks } from '@/hooks/useLlmLinks';
import { useToast } from "@/hooks/use-toast";
import { APP_CONFIG, CATEGORIES, NOTION_URLS, API_URLS } from '@/config/types';

export default function LlmLinksPage() {
  const { data: links, isLoading, error, refetch } = useLlmLinks();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(true);
  const [showNewLinkForm, setShowNewLinkForm] = useState<boolean>(false);

  const handleRefresh = async () => {
    toast({ title: "Syncing with Notion...", description: "Fetching the latest links." });
    
    try {
      const response = await fetch(`${API_URLS.base}${API_URLS.endpoints.fetchAndCache}?type=llm_links`);
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error);
      
      await refetch();
      
      toast({ title: "Sync Complete!", description: result.message });
    } catch (err) {
      const isOffline = !navigator.onLine || err.message.includes('fetch');
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: isOffline ? "Please check your internet connection and try again." : err.message,
      });
    }
  };

  // Extract unique categories from the data
  const categories = useMemo(() => {
    if (!links) return [];
    const cats = new Set<string>();
    links.forEach(link => {
      if (Array.isArray(link.category)) {
        link.category.forEach(cat => {
          if (cat && typeof cat === 'string') {
            cats.add(cat);
          }
        });
      }
    });
    return Array.from(cats).sort();
  }, [links]);

  // Filter links based on search and category
  const filteredLinks = useMemo(() => {
    if (!links) return [];
    return links.filter(link => {
      const matchesSearch = searchTerm === '' || 
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || selectedCategory === 'popular' || 
        (Array.isArray(link.category) && link.category.includes(selectedCategory));
      
      const matchesPopular = !showPopularOnly || link.isPopular;
      
      return matchesSearch && matchesCategory && matchesPopular;
    });
  }, [links, searchTerm, selectedCategory]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!links) return { total: 0, categories: 0, popular: 0 };
    const totalLinks = links.length;
    const uniqueCategories = new Set(links.map(link => link.category)).size;
    const popularCount = links.filter(link => link.isPopular).length;

    return {
      total: totalLinks,
      categories: uniqueCategories,
      popular: popularCount
    };
  }, [links]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Loading links...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-destructive">Error Loading Links</CardTitle>
              <CardDescription>
                Failed to load links from the cache. Please try syncing with Notion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRefresh} className="w-full">
                Sync with Notion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-foreground">{APP_CONFIG.name}</h2>
            <Button size="sm" onClick={() => setShowNewLinkForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New link
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => window.open(NOTION_URLS.databases.llmLinks.view, '_blank')}
              variant="outline"
              size="sm"
              className="mr-2"
            >
              Edit in Database
            </Button>
            <Button onClick={handleRefresh} variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Title and Subtitle */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">{APP_CONFIG.name}</h1>
          <p className="text-lg text-muted-foreground">Access your favorite AI models and platforms.</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, model, tags, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg rounded-xl border-border bg-background focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setSelectedCategory('popular');
              setShowPopularOnly(true);
            }}
            className="rounded-full"
          >
            Popular
          </Button>
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setSelectedCategory('all');
              setShowPopularOnly(false);
            }}
            className="rounded-full"
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* New Link Form */}
        {showNewLinkForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 -mt-12"
                onClick={() => setShowNewLinkForm(false)}
              >
                ✕
              </Button>
              <NewLinkForm />
            </div>
          </div>
        )}

        {/* Links Grid */}
        {filteredLinks.length === 0 ? (
          <Card className="max-w-md mx-auto bg-card">
            <CardHeader>
              <CardTitle>No links found</CardTitle>
              <CardDescription>
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No LLM links available.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="w-full"
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLinks.map((link) => (
              <LlmLinkCard key={link.id} link={link} />
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Link className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
