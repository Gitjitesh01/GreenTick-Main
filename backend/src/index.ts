import type { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Grant create permission for newsletter-subscriber to public role
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const permissionAction = 'api::newsletter-subscriber.newsletter-subscriber.create';
        const permissionExists = await strapi.query('plugin::users-permissions.permission').findOne({
          where: {
            action: permissionAction,
            role: publicRole.id,
          },
        });

        if (!permissionExists) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: permissionAction,
              role: publicRole.id,
            },
          });
          strapi.log.info('Granted public create permission for newsletter-subscriber');
        }
      }
    } catch (error) {
      strapi.log.error('Failed to grant public create permission for newsletter-subscriber:', error);
    }
  },
};
