# The Anti-Scroll : The AI-powered daily briefing designed to kill the infinite scroll.

**The Anti-Scroll** is an automated, self-pacing daily news aggregator built with **n8n**. It is designed to completely bypass morning algorithmic doomscrolling by fetching global RSS feeds, shuffling them for variety, using **Google Gemini 2.5 Flash** to write concise two-sentence summaries, and delivering a beautifully formatted daily briefing straight to a Discord channel.

Read the news. Close the app. Get your morning back.

## Features
* **Zero-Cost Architecture:** Built entirely using free-tier APIs and open RSS feeds.
* **Anti-Echo Chamber:** Shuffles feeds from tech, sports, national, and global sources to ensure a balanced news diet.
* **Smart Rate-Limiting:** Incorporates a custom execution loop with an 8-second delay timer to spoon-feed data to the AI, completely bypassing the strict `429 Too Many Requests` API limits.
* **AI Curation:** Employs prompt engineering to force the LLM to output strict, factual, 2-sentence summaries without clickbait or fluff.

##  Architecture & Workflow
1. **Schedule Trigger:** Runs automatically every morning.
2. **Data Ingestion:** Pulls XML/RSS data from BBC, The Verge, ESPN, and The Hindu.
3. **Data Transformation:** Shuffles the array randomly and isolates exactly 10 stories.
4. **The Execution Loop:** * Passes one article to the Gemini node.
   * Formats the AI response and original URL into clean Discord markdown.
   * Posts to the Discord Webhook.
   * Triggers an 8-second `Wait` node before returning to the loop for the next item.

##  Prerequisites
To run this workflow yourself, you will need:
* An **n8n** instance (Cloud or Self-Hosted).
* A **Google Gemini API Key** (Free tier works perfectly).
* A **Discord Webhook URL** for your destination server.

## Installation & Setup
1. Clone or download this repository.
2. Open your n8n workspace and click **Add Workflow**.
3. In the top right menu, select **Import from File** and upload the `workflow.json` file.
4. Set up your credentials:
   * Double-click the **Google Gemini Chat Model** node and add your API key.
   * Double-click the **Discord** node and paste your Webhook URL.
5. Click **Test Workflow** to ensure everything is running smoothly.
6. Toggle the workflow to **Active**!

## Lessons Learned
Handling live production data requires defensive engineering. Initially, processing 10 articles simultaneously triggered immediate Google API rate limits and crashed the pipeline. Re-architecting the flow from a linear sequence into a paced, single-batch loop solved the API limits entirely without requiring a paid tier, proving that visual automation tools can handle robust error-handling and API pacing.
