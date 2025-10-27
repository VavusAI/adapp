import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Targeting, Surface } from '@/types';
import { useState } from 'react';

interface TargetingStepProps {
  targeting: Targeting;
  setTargeting: (targeting: Targeting) => void;
  surfaces: Surface[];
}

const categoryOptions = [
  'Fashion', 'Technology', 'Lifestyle', 'Food & Beverage',
  'Travel', 'Home & Garden', 'Sports & Fitness', 'Beauty & Personal Care',
];

const countryOptions = ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'JP'];

export default function TargetingStep({
  targeting,
  setTargeting,
  surfaces,
}: TargetingStepProps) {
  const [keywordInput, setKeywordInput] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [topicInput, setTopicInput] = useState('');

  const addKeyword = () => {
    if (keywordInput.trim() && !targeting.keywords.includes(keywordInput.trim())) {
      setTargeting({
        ...targeting,
        keywords: [...targeting.keywords, keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setTargeting({
      ...targeting,
      keywords: targeting.keywords.filter((k) => k !== keyword),
    });
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().startsWith('#') ? hashtagInput.trim() : `#${hashtagInput.trim()}`;
    if (tag.length > 1 && !targeting.hashtags.includes(tag)) {
      setTargeting({
        ...targeting,
        hashtags: [...targeting.hashtags, tag],
      });
      setHashtagInput('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setTargeting({
      ...targeting,
      hashtags: targeting.hashtags.filter((h) => h !== hashtag),
    });
  };

  const addTopic = () => {
    if (topicInput.trim() && !targeting.newsTopics.includes(topicInput.trim())) {
      setTargeting({
        ...targeting,
        newsTopics: [...targeting.newsTopics, topicInput.trim()],
      });
      setTopicInput('');
    }
  };

  const removeTopic = (topic: string) => {
    setTargeting({
      ...targeting,
      newsTopics: targeting.newsTopics.filter((t) => t !== topic),
    });
  };

  const toggleCategory = (category: string) => {
    if (targeting.categories.includes(category)) {
      setTargeting({
        ...targeting,
        categories: targeting.categories.filter((c) => c !== category),
      });
    } else {
      setTargeting({
        ...targeting,
        categories: [...targeting.categories, category],
      });
    }
  };

  const toggleCountry = (country: string) => {
    const countries = targeting.geo.countries.includes(country)
      ? targeting.geo.countries.filter((c) => c !== country)
      : [...targeting.geo.countries, country];
    setTargeting({
      ...targeting,
      geo: { ...targeting.geo, countries },
    });
  };

  const toggleDevice = (device: 'mobile' | 'desktop') => {
    if (targeting.devices.includes(device)) {
      setTargeting({
        ...targeting,
        devices: targeting.devices.filter((d) => d !== device),
      });
    } else {
      setTargeting({
        ...targeting,
        devices: [...targeting.devices, device],
      });
    }
  };

  return (
    <div className="space-y-8">
      {surfaces.includes('shop_search') && (
        <div className="space-y-4">
          <Label>Keywords (Shop Search)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <button
              type="button"
              onClick={addKeyword}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {targeting.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="gap-1">
                {keyword}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label>Categories</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {categoryOptions.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={targeting.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {surfaces.includes('social_feed') && (
        <div className="space-y-4">
          <Label>Hashtags (Social)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="#hashtag"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
            />
            <button
              type="button"
              onClick={addHashtag}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {targeting.hashtags.map((hashtag) => (
              <Badge key={hashtag} variant="secondary" className="gap-1">
                {hashtag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeHashtag(hashtag)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {surfaces.includes('news_article') && (
        <div className="space-y-4">
          <Label>News Topics</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., business, technology"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTopic()}
            />
            <button
              type="button"
              onClick={addTopic}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {targeting.newsTopics.map((topic) => (
              <Badge key={topic} variant="secondary" className="gap-1">
                {topic}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTopic(topic)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label>Geographic Targeting</Label>
        <div className="flex flex-wrap gap-2">
          {countryOptions.map((country) => (
            <Badge
              key={country}
              variant={targeting.geo.countries.includes(country) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleCountry(country)}
            >
              {country}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Device Targeting</Label>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mobile"
              checked={targeting.devices.includes('mobile')}
              onCheckedChange={() => toggleDevice('mobile')}
            />
            <label htmlFor="mobile" className="text-sm font-medium cursor-pointer">
              Mobile
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="desktop"
              checked={targeting.devices.includes('desktop')}
              onCheckedChange={() => toggleDevice('desktop')}
            />
            <label htmlFor="desktop" className="text-sm font-medium cursor-pointer">
              Desktop
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Brand Safety</Label>
        <RadioGroup
          value={targeting.brandSafety}
          onValueChange={(value) =>
            setTargeting({ ...targeting, brandSafety: value as 'standard' | 'strict' })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <label htmlFor="standard" className="text-sm font-medium cursor-pointer">
              Standard - Moderate brand safety controls
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="strict" id="strict" />
            <label htmlFor="strict" className="text-sm font-medium cursor-pointer">
              Strict - Enhanced brand safety controls
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Frequency Cap</Label>
          <span className="text-sm text-muted-foreground">
            {targeting.frequencyCap} impressions/user/day
          </span>
        </div>
        <Slider
          value={[targeting.frequencyCap]}
          onValueChange={([value]) =>
            setTargeting({ ...targeting, frequencyCap: value })
          }
          min={1}
          max={10}
          step={1}
        />
      </div>
    </div>
  );
}
