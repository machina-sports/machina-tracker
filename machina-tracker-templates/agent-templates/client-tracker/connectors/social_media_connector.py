def get_instagram_metrics(handle: str):
    """
    A mock function to return Instagram metrics for a given handle.
    In a real implementation, this would call the Instagram API.
    """
    # Mock data based on handle to make it deterministic
    if "flamengo" in handle.lower():
        return {
            "followers": 50000000,
            "engagement_rate": 0.05,
            "recent_posts": [
                {"text": "Grande vitória hoje!", "likes": 1000000},
                {"text": "Dia de treino.", "likes": 500000}
            ]
        }
    else:
        return {
            "followers": 10000000,
            "engagement_rate": 0.03,
            "recent_posts": [
                {"text": "Vamos com tudo!", "likes": 200000},
                {"text": "Nova camisa.", "likes": 300000}
            ]
        }
