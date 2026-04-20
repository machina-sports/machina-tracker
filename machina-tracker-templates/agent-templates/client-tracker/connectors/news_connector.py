def search_news(query: str):
    """
    A mock function to return news articles for a given query.
    """
    # Mock data
    return {
        "articles": [
            {"title": f"{query} secures major victory", "source": "Sports News Online", "sentiment": "positive"},
            {"title": f"An analysis of {query}'s recent performance", "source": "Football Analytics Weekly", "sentiment": "neutral"},
            {"title": f"{query} announces new player signing", "source": "Transfer Hub", "sentiment": "positive"}
        ]
    }
