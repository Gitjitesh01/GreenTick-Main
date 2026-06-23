import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): any => ({
  navigation: {
    enabled: true,
  },
});

export default config;
