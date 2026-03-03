import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

// 1. Import the Vercel inject function
import { injectSpeedInsights } from '@vercel/speed-insights';

import { SimpliaiWidgetComponent } from './components/simpliai-widget/simpliai-widget.component';

import { SiteHeaderComponent } from './core/layout/site-header/site-header.component';
import { SiteFooterComponent } from './core/layout/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, SimpliaiWidgetComponent],
  templateUrl: './app.component.html',
})
/**
 * Main application component that serves as the root component.
 * It includes the router outlet and layout components like header and footer.
 */
export class AppComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  // 2. Fire it when the app starts
  ngOnInit() {
    //1. Set the SEO Title
    this.title.setTitle('Simplicreate | High-Performance Web Ops & Infrastructure');
    //2. Set the SEO Description
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Boutique web operations and infrastructure agency specialising in secure migrations, zero-bloat architecture, and ultra-fast hosting.',
      },
      {
        property: 'og:description',
        content: 'We build enterprise-grade, high-performance web infrastructure',
      },
      { property: 'og:url', content: 'https://simplicreate.tech/' },

      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:image', content: 'https://simplicreate/com/assets/brand/simplicreate-social-card.webp'},
    ])
    
  

    injectSpeedInsights();
  }
}
