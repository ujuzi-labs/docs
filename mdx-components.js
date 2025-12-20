import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import StandardButton from '@/components/StandardButton';
import TeamCards from '@/components/TeamCards';
import FeatureText from '@/components/FeatureText';

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    StandardButton,
    TeamCards,
    FeatureText,
    ...components
  }
}
