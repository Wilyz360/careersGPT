<h1 align="center"><b>Next.js</b> + <b>Supabase</b> + <b>Node</b></h1>
<h2>To run:</h2>
<code>cd pupserver && npm install && cd .. && cd next-app && npm install && npm run dev</code>

## Overview
Fully automated job applying service, with capability to render its own Puppeteer automated browser scripts and input your data on 3rd part application websites.

## Inspiration
A fully automated job applying service
## What it does
Only apply to Easy Apply's for now, assuming that a user has previously supplied a resume to their LinkedIn. 
Current version using a fresh and empty LinkedIn account, unable to take user's credentials.

The plan was to detect if it's an Easy Apply and apply. If it's not, scrape the link that will lead us to a 3rd party website, download the HTML, process it so that it does not have too much text, for example deleting useless (for the automated browser) <script>, <body>, <head> tags,. etc. and ask ChatGPT 4 API an accurate prompt: 

"for this {html}, write a Puppeteer script that uses accurate CSS selectors and input the user's data into correct fields: {user_data}, if cover letter field exists, write a cover letter using {resume} and {short_story} (earlier supplied by user, to prevent sounding soulless and emphasize user's strengths). STRICTLY RETURN THE PUPPETEER CODE WITH DESIRED INFORMATION."

This API call would return a Puppeteer script, that we could simply extract and execute inside our Node server like this: exec(script)
## How we built it

## Challenges we ran into
Glassdoor and Indeed's heavy bot detection and combat with captchas, dynamic CSS classes. The transition to LinkedIn was made at 3am on the day of submissions.
## Accomplishments that we're proud of
Undetected by LinkedIn
## What we learned
Running a website and a dedicated node server on one machine, 
What we learned and is not shown in project:
[x] Executing code from API calls (not in submission)
[x] Very accurate Chat GPT prompts
[x] New, experimental NextJS 13 'app' folder with server components
[x] Safe credentials handling in server/client components
[x] In-depth Puppeteer library tricks
[x] In-depth Automated Browser bot anti-detection
## What's next for CareersGPT
Handle all variants of easy submits (some require to make you pick options instead of one click), protect against bot detection and apply on 3rd party websites!

