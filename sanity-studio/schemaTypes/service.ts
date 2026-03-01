import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service / Engagement',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name (e.g., The Patch)',
            type: 'string',
        }),
        defineField({
            name: 'id',
            title: 'ID (Exact lowercase, e.g., patch, launchpad, operator)',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'priceLine',
            title: 'Price Line',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'bullets',
            title: 'Features / Bullets',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'highlight',
            title: 'Highlight as Most Popular?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
        }),

    ],
    // ADD THIS PREVIEW BLOCK:
    preview: {
        select: {
            title: 'name',
            subtitle: 'priceLine'
        }
    }
})
