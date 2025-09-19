'use client';

import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export type TTag = {
  key: string;
  name: string;
};

type MultipleSelectProps = {
  tags: TTag[];
  customTag?: (item: TTag) => ReactNode | string;
  onChange?: (value: TTag[]) => void;
  defaultValue?: TTag[];
  label?: string;
  placeholder?: string;
  className?: string;
};

export const MultipleSelect = ({
  tags,
  customTag,
  onChange,
  defaultValue,
  label = "Tags",
  placeholder = "Select tags...",
  className,
}: MultipleSelectProps) => {
  const [selected, setSelected] = useState<TTag[]>(defaultValue ?? []);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollBy({
        left: containerRef.current?.scrollWidth,
        behavior: 'smooth',
      });
    }
    onValueChange(selected);
  }, [selected]);

  const onValueChange = (value: TTag[]) => {
    onChange?.(value);
  };

  const onSelect = (item: TTag) => {
    setSelected((prev) => [...prev, item]);
  };

  const onDeselect = (item: TTag) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  };

  return (
    <AnimatePresence mode={'popLayout'}>
      <div className={cn('flex w-full flex-col gap-2', className)}>
        <label className="text-sm font-medium">
          {label} <span className="text-red-500">*</span>
        </label>
        
        {/* Selected Tags Display Area */}
        <motion.div
          layout
          ref={containerRef}
          className='selected no-scrollbar flex min-h-12 w-full items-center overflow-x-scroll scroll-smooth rounded-md border border-border bg-background p-2 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
        >
          <motion.div layout className='flex items-center gap-2'>
            {selected?.length === 0 && (
              <span className="text-muted-foreground text-sm">
                {placeholder}
              </span>
            )}
            {selected?.map((item) => (
              <Tag
                name={item?.key}
                key={item?.key}
                className={'bg-secondary text-secondary-foreground border border-border shadow-sm'}
              >
                <div className='flex items-center gap-2'>
                  <motion.span layout className={'text-nowrap text-sm'}>
                    {item?.name}
                  </motion.span>
                  <button 
                    className={'hover:bg-muted rounded-sm p-0.5 transition-colors'} 
                    onClick={() => onDeselect(item)}
                    type="button"
                  >
                    <X size={12} className="text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              </Tag>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Available Tags Selection Area */}
        {tags?.length > selected?.length && (
          <motion.div 
            layout
            className='flex w-full flex-wrap gap-2 rounded-md border border-border bg-muted/30 p-3 max-h-32 overflow-y-auto'
          >
            <div className="w-full">
              <span className="text-xs text-muted-foreground mb-2 block">
                Available tags (click to add):
              </span>
              <div className="flex flex-wrap gap-2">
                {tags
                  ?.filter((item) => !selected?.some((i) => i.key === item.key))
                  .map((item) => (
                    <Tag
                      name={item?.key}
                      onClick={() => onSelect(item)}
                      key={item?.key}
                      className="bg-background hover:bg-accent hover:text-accent-foreground border border-border transition-colors"
                    >
                      {customTag ? (
                        customTag(item)
                      ) : (
                        <motion.span layout className={'text-nowrap text-sm'}>
                          {item?.name}
                        </motion.span>
                      )}
                    </Tag>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Helper text */}
        <p className="text-xs text-muted-foreground">
          Selected {selected.length} of {tags.length} tags
        </p>
      </div>
    </AnimatePresence>
  );
};

type TagProps = PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    name?: string;
    className?: string;
  };

export const Tag = ({ children, className, name, onClick }: TagProps) => {
  return (
    <motion.div
      layout
      layoutId={name}
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-md px-2 py-1 text-sm font-medium transition-all duration-200',
        'hover:scale-105 active:scale-95',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};
