import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    logo: Schema.Attribute.Component<'shared.logo-link', false>;
    navItems: Schema.Attribute.Component<'shared.link', true>;
    Our_Product: Schema.Attribute.Component<'shared.our-product', true>;
    socialLinks: Schema.Attribute.Component<'shared.logo-link', true>;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Component<'shared.logo-link', false>;
    navItems: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedComparisonSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_comparison_sections';
  info: {
    displayName: 'Comparison Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    rows: Schema.Attribute.Component<'shared.rows', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedConversationChargeRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_conversation_charge_rows';
  info: {
    displayName: 'Conversation Charge Row';
  };
  attributes: {
    category: Schema.Attribute.String;
    color: Schema.Attribute.Enumeration<['red', 'blue', 'yellow', 'green']>;
    description: Schema.Attribute.Text;
    rate: Schema.Attribute.String;
  };
}

export interface SharedCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_sections';
  info: {
    displayName: 'CTA Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    secondaryButtonLink: Schema.Attribute.String;
    secondaryButtonText: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedDropdownItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_dropdown_items';
  info: {
    displayName: 'Dropdown Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedFaqCategories extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_categories';
  info: {
    displayName: 'FAQ Categories';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.faq-question-item', true>;
    title: Schema.Attribute.Text;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FAQ Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    faqCategories: Schema.Attribute.Component<'shared.faq-categories', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedFaqQuestionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_question_items';
  info: {
    displayName: 'Faq Question Item';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.Text;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: 'Feature Item';
  };
  attributes: {
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    dropdownItems: Schema.Attribute.Component<'shared.dropdown-item', true>;
    href: Schema.Attribute.String;
    isButtonLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isDropdown: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    menuDetail: Schema.Attribute.Component<'shared.menu-detail', true>;
    nav_description: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
  };
}

export interface SharedLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_logo_links';
  info: {
    displayName: 'Logo Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMenuDetail extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_details';
  info: {
    displayName: 'Menu Detail';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMetaPricingSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_pricing_sections';
  info: {
    displayName: 'Meta Pricing Section';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    rows: Schema.Attribute.Component<'shared.conversation-charge-row', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedOurProduct extends Struct.ComponentSchema {
  collectionName: 'components_shared_our_products';
  info: {
    displayName: 'Our Product';
  };
  attributes: {
    name: Schema.Attribute.String;
    product_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedPricingHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_pricing_heroes';
  info: {
    displayName: 'Pricing Hero';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SharedPricingPlansSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_pricing_plans_sections';
  info: {
    displayName: 'Pricing Plans Section';
  };
  attributes: {
    annualDiscount: Schema.Attribute.Integer;
    enableCurrencyToggle: Schema.Attribute.Boolean;
    enableYearlyToggle: Schema.Attribute.Boolean;
    sectionBadge: Schema.Attribute.String;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedRows extends Struct.ComponentSchema {
  collectionName: 'components_shared_rows';
  info: {
    displayName: 'rows';
  };
  attributes: {
    aigreentick: Schema.Attribute.String;
    aisensy: Schema.Attribute.String;
    feature: Schema.Attribute.String;
    interakt: Schema.Attribute.String;
    wati: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'shared.comparison-section': SharedComparisonSection;
      'shared.conversation-charge-row': SharedConversationChargeRow;
      'shared.cta-section': SharedCtaSection;
      'shared.dropdown-item': SharedDropdownItem;
      'shared.faq-categories': SharedFaqCategories;
      'shared.faq-item': SharedFaqItem;
      'shared.faq-question-item': SharedFaqQuestionItem;
      'shared.feature-item': SharedFeatureItem;
      'shared.link': SharedLink;
      'shared.logo-link': SharedLogoLink;
      'shared.media': SharedMedia;
      'shared.menu-detail': SharedMenuDetail;
      'shared.meta-pricing-section': SharedMetaPricingSection;
      'shared.our-product': SharedOurProduct;
      'shared.pricing-hero': SharedPricingHero;
      'shared.pricing-plans-section': SharedPricingPlansSection;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.rows': SharedRows;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
