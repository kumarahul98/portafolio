# SEO Plan

Goal: make `rahulkmr.com` the strongest web entity for your specific identity, not just "a Rahul Kumar".

## Phase 1: Technical Baseline

1. Verify `rahulkmr.com` in Google Search Console.
2. Submit `https://www.rahulkmr.com/sitemap.xml`.
3. Inspect and request indexing for:
   - homepage
   - any new about page
   - any new talks/blog pages
4. Confirm only one canonical host is indexed:
   - `https://www.rahulkmr.com/`
   - redirect all non-canonical variants if needed
5. Recheck `robots.txt`, `sitemap.xml`, canonical tags, and status codes after deploys.
6. Add Bing Webmaster Tools as a secondary index source.

## Phase 2: Entity SEO

1. Expand `Person` schema on the site:
   - `name`
   - `url`
   - `image`
   - `jobTitle`
   - `description`
   - `worksFor`
   - `sameAs`
   - `knowsAbout`
   - `alumniOf` if relevant
   - `nationality` only if you want it public
2. Add `Organization` schema for AntStack mention only where appropriate.
3. Make sure the exact same identity string appears consistently:
   - `Rahul Kumar`
   - `Principal Solutions Architect`
   - `AntStack`
   - `AWS`
4. Add a strong "About Rahul Kumar" section near the top of the homepage in crawlable text.
5. Add a real headshot `image` reference in schema.

## Phase 3: Homepage SEO

1. Tighten homepage title for branded ranking.
   Suggested pattern:
   - `Rahul Kumar | Principal Solutions Architect | AntStack`
2. Tighten meta description around your specific identity.
3. Ensure H1 clearly contains `Rahul Kumar`.
4. Add supporting text with your differentiators:
   - AWS
   - AntStack
   - cloud-native
   - serverless
   - data/GenAI
   - speaker
5. Add internal anchor links that reflect key topics:
   - About
   - Talks
   - Writing
   - Projects
6. Add more descriptive alt text where useful.

## Phase 4: New Pages On Your Domain

1. Create `/about`
   - full bio
   - experience
   - certifications
   - speaking
   - links
2. Create `/talks`
   - all speaking sessions
   - event names
   - dates
   - topics
   - video links
3. Create `/writing`
   - your articles with summaries
4. Create `/projects`
   - individual project pages or at least richer project summaries
5. Create `/contact`
   - simple crawlable contact page
6. Optional:
   - `/media`
   - `/resume`
   - `/aws`
   - `/genai`

## Phase 5: Content Strategy

1. Publish 5 to 10 articles on your own domain, not just external sites.
2. Focus on topics tied to your identity:
   - AWS architecture
   - serverless
   - data engineering
   - GenAI
   - talks/conference recap
3. Add one article specifically optimized for your name:
   - `About Rahul Kumar`
   - `Rahul Kumar on AWS, Data, and GenAI`
4. Write recap pages for talks you gave.
5. Add transcript or summary sections for videos hosted elsewhere.

## Phase 6: Off-Site Profile Alignment

1. Update LinkedIn website field to `rahulkmr.com`.
2. Update GitHub profile website field to `rahulkmr.com`.
3. Update X bio/link to `rahulkmr.com`.
4. Update AntStack author profile to link to `rahulkmr.com`.
5. Update conference/speaking/event profiles to link to `rahulkmr.com`.
6. Make name, title, and bio consistent across all profiles.

## Phase 7: Backlinks

1. Get a backlink from your AntStack author page.
2. Get backlinks from event/speaker pages where you’ve spoken.
3. Add your site to GitHub profile README or profile page.
4. Add your site to community/member pages where relevant.
5. Get podcast/event/blog appearances to link your site by name.
6. Prefer anchor text like:
   - `Rahul Kumar`
   - `Rahul Kumar AWS`
   - `Rahul Kumar AntStack`

## Phase 8: Rich Snippets and SERP Quality

1. Improve OG/Twitter image branding.
2. Add `Article` schema if you publish blog posts.
3. Add `BreadcrumbList` schema once multi-page structure exists.
4. Add `WebSite` schema with search action only if useful.
5. Improve snippet copy so branded search results look stronger.

## Phase 9: Performance and UX

1. Keep mobile LCP low.
2. Avoid layout shifts on first load.
3. Keep text readable without waiting on fonts.
4. Keep pages crawlable without requiring JS for primary content.
5. Keep important content in prerendered HTML.

## Phase 10: Measurement

1. Track branded queries in Search Console:
   - `rahul kumar`
   - `rahul kumar antstack`
   - `rahul kumar aws`
   - `rahul kmr`
2. Watch impressions, CTR, average position.
3. Check which page Google prefers for your name.
4. Adjust titles/meta based on CTR.
5. Review monthly.

## Recommended Order

1. Search Console setup
2. Schema expansion
3. Homepage title/meta/body copy
4. `/about` page
5. Off-site profile alignment
6. `/talks` and `/writing`
7. Backlinks
8. Ongoing content

## First Task Set I Recommend

1. Expand `Person` schema.
2. Improve homepage title and description.
3. Add stronger above-the-fold crawlable bio text.
4. Create `/about`.
5. Update LinkedIn/GitHub/AntStack profile links.
