import { useEffect, useCallback, useMemo } from "react";

interface SeoProps {  
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function useSeo(props: SeoProps | string) {
  const { title } = typeof props === 'string' ? { title: props } : props;
  const siteName = 'Mog Console';
  const siteDescription = 'The Powerfull Console for Mog System';

  const seo = useMemo(() => {
    return {
      title: `${title} - ${siteName}` || siteName,
      description: siteDescription,
    };
  }, [title, siteName, siteDescription]);

  const updateTitle = useCallback(() => {
    document.title = seo.title;
  }, [seo]);

  useEffect(() => {
    updateTitle();
  }, [updateTitle]);
}
