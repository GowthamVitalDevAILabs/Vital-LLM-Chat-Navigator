// src/pages/LlmLinksPage.tsx

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Link, RefreshCw, Table } from 'lucide-react';
import { LlmLinkCard } from '@/components/LlmLinkCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserProfile } from '@/components/UserProfile';
import { NewLinkForm } from '@/components/NewLinkForm';
import { useLlmLinks } from '@/hooks/useLlmLinks';
import { useToast } from '@/hooks/use-toast';
import { APP_CONFIG, CATEGORIES, NOTION_URLS, API_URLS } from '@/config/types';

export default function LlmLinksPage() {
  const { data: links, isLoading, error, refetch } = useLlmLinks();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(true);
  const [showNewLinkForm, setShowNewLinkForm] = useState<boolean>(false);

  const handleRefresh = () => {
    refetch();
    toast({ 
      title: "Refreshing...", 
      description: "Fetching the latest links." 
    });
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
            <div className="flex items-center gap-2">
              <Dialog open={showNewLinkForm} onOpenChange={setShowNewLinkForm}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New link
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <NewLinkForm onClose={() => setShowNewLinkForm(false)} />
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline" onClick={() => window.location.href = '/table'}>
                <Table className="mr-2 h-4 w-4" />
                View / Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.location.href = '/prompts'}>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Prompts
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleRefresh} variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <UserProfile />
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
