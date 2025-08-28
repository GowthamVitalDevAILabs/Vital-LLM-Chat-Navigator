import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface NewLinkFormData {
  category: string[];
  description: string;
  isPopular: boolean;
  model: string;
  tags: string[];
  url: string;
}

export function NewLinkForm() {
  const [formData, setFormData] = useState<NewLinkFormData>({
    category: [],
    description: '',
    isPopular: false,
    model: '',
    tags: [],
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleTagsChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: value.split(',').map(tag => tag.trim()).filter(Boolean)
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value.split(',').map(cat => cat.trim()).filter(Boolean)
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Link</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL</label>
            <Input
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="Enter URL"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <Input
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              placeholder="Enter model name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categories (comma-separated)</label>
            <Input
              value={formData.category.join(', ')}
              onChange={(e) => handleCategoryChange(e.target.value)}
              placeholder="Enter categories"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (comma-separated)</label>
            <Input
              value={formData.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="Enter tags"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPopular"
              checked={formData.isPopular}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, isPopular: checked as boolean }))
              }
            />
            <label htmlFor="isPopular" className="text-sm font-medium">
              Popular Link
            </label>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
