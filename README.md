# Machina Tracker — Client Pulse

This application provides a real-time dashboard for tracking the brand performance and social media engagement of client clubs. It leverages the Machina Sports AI platform to analyze data and generate a "heat score" for each client.

## Architecture

- **Frontend**: A [Next.js](https://nextjs.org/) 16 application using the App Router.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/).
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/).
- **Backend**: The frontend communicates with a [Machina Client API](https://docs.machina.gg/api-reference/introduction) backend. The necessary workflows, agents, and connectors for this project are provisioned from the `machina-tracker-templates/agent-templates/client-tracker` template.

## Local Development

### Prerequisites

- [Bun](https://bun.sh/)
- Access to the Machina Sports platform.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following variables:

    ```env
    # The API key for your Machina project.
    # Generate this from the Machina Studio: Settings -> API Keys
    MACHINA_API_KEY="your-machina-api-key"

    # The URL of your Machina Client API.
    # This is found in the Machina Studio: Settings -> API Status
    MACHINA_CLIENT_API_URL="https://your-org-your-project.org.machina.gg"

    # The slug of your Machina project.
    # e.g., for "Machina Tracker — Client Pulse", the slug is "machina-tracker-client-pulse"
    MACHINA_PROJECT_SLUG="your-project-slug"
    ```

4.  **Run the development server:**
    ```bash
    bun run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

## How to Add a New Client Club

Client clubs are managed within the associated Machina project, not directly in this frontend's source code. To add a new client:

1.  Log in to the **Machina Studio**.
2.  Navigate to your project (`Machina Tracker — Client Pulse`).
3.  Go to the **Documents** section.
4.  Create a new document with the `client-roster` tag.
5.  The document should be a JSON object containing the club's details, including their name, ID, and any external IDs (like Instagram handles).
6.  The frontend will automatically pick up the new client from the Machina Client API.

## How the Heat Score is Computed

The Heat Score is a proprietary metric calculated by a Machina workflow that aggregates multiple data points to represent a client's current brand momentum. The five key components are:

1.  **Social Media Engagement**: Velocity and volume of interactions on platforms like Instagram.
2.  **News & Media Mentions**: Recent coverage in sports news and other media outlets.
3.  **Performance Milestones**: Significant achievements, like winning a championship or a key player signing a contract.
4.  **Partner Activations**: Brand partner campaigns and their reach.
5.  **Viral Moments**: Organic, high-velocity content spread.

## Deployment

This project is configured for Vercel deployment. To deploy a preview or production build:

1.  Push your changes to a branch on the GitHub repository.
2.  The Vercel for GitHub integration will automatically trigger a new build and deployment.
3.  Preview deployments are created for every pull request, and production deployments are created when code is merged into the `main` branch.
4.  Environment variables (as listed above) must be configured in the Vercel project settings.
