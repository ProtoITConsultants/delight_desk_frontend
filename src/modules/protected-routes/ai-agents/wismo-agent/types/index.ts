export interface WoocommerceTrackingProps {
  hasTrackingPlugin: boolean;
  setHasTrackingPlugin: (value: boolean) => void;
}

interface TrackingPluginSolutionItemLink {
  label: string;
  href: string;
}

export interface TrackingPluginSolutionItemProps {
  title: string;
  description: string;
  referenceLink: TrackingPluginSolutionItemLink;
}
