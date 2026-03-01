import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'heroBenefits',
      title: 'Hero Benefits',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'Primary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaPrimaryHref',
      title: 'Primary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Secondary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryHref',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'ctaTertiaryText',
      title: 'Tertiary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaTertiaryHref',
      title: 'Tertiary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'brandLabel',
      title: 'Brand Label',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  // ADD THIS PREVIEW BLOCK:
  preview: {
    select: {
      title: 'heroHeadline'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Main Site Settings'
      }
    }
  }
})