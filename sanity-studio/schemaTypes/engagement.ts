import { defineType, defineField } from 'sanity'

export const engagement = defineType({
  name: 'engagement',
  title: 'Engagement',
  type: 'document',

  fields: [
    defineField({
      name: 'id',
      title: 'Internal ID',
      type: 'string',
      description: 'Unique key used in the frontend (e.g. launchpad, operator)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'priceLine',
      title: 'Price Line',
      type: 'string',
      description: 'Short pricing label (e.g. Once-off engagement, Monthly engagement)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'highlight',
      title: 'Highlight / Recommended',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'priceLine',
    },
  },
})