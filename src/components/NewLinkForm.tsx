import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateLlmLink } from '@/hooks/useLlmLinks';
import { useToast } from '@/hooks/use-toast';
import type { LlmLinkInsert } from '@/hooks/useLlmLinks';
import modelsData from '@/data/models.json';

interface NewLinkFormProps {
  onClose: () => void;
}

export function NewLinkForm({ onClose }: NewLinkFormProps) {
  const { toast } = useToast();
  const createLlmLink = useCreateLlmLink();
  const [formData, setFormData] = useState<LlmLinkInsert>({
    name: '',
    category: [],
    description: '',
    isPopular: false,
    model: '',
    tags: [],
    url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLlmLink.mutateAsync(formData);
      toast({
        title: 'Success',
        description: 'Link created successfully',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create link',
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      tags: value.split(',').map(tag => tag.trim()).filter(Boolean)
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: value.split(',').map(cat => cat.trim()).filter(Boolean)
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold leading-none tracking-tight">Add New Link</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL <span className="text-red-500">*</span></label>
            <Input
              required
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="Enter URL"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model <span className="text-red-500">*</span></label>
            <Select 
              value={formData.model} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {modelsData.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <label className="text-sm font-medium">Categories (comma-separated) <span className="text-red-500">*</span></label>
            <Input
              required
              value={formData.category.join(', ')}
              onChange={handleCategoryChange}
              placeholder="category1, category2, category3"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (comma-separated) <span className="text-red-500">*</span></label>
            <Input
              required
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              placeholder="tag1, tag2, tag3"
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
    </div>
  );
}
