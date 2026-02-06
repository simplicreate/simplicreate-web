import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandLabel', title: 'Small brand label (top)', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero subheadline', type: 'text' }),

    defineField({ name: 'ctaPrimaryText', title: 'Primary CTA text', type: 'string' }),
    defineField({ name: 'ctaPrimaryHref', title: 'Primary CTA link', type: 'string' }),

    defineField({ name: 'ctaSecondaryText', title: 'Secondary CTA text', type: 'string' }),
    defineField({ name: 'ctaSecondaryHref', title: 'Secondary CTA link', type: 'string' }),

    defineField({ name: 'ctaTertiaryText', title: 'Tertiary CTA text', type: 'string' }),
    defineField({ name: 'ctaTertiaryHref', title: 'Tertiary CTA link', type: 'string' }),

    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
  ],
})