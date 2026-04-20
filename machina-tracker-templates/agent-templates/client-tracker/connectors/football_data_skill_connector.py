def get_club_fixtures(club_name: str):
    """
    A mock function to return fixtures for a given club.
    This simulates calling the football-data skill.
    """
    # Mock data
    return {
        "recent_matches": [
            {"date": "2024-07-20", "opponent": "Rival FC", "result": "W", "score": "3-1"},
            {"date": "2024-07-15", "opponent": "Another Team", "result": "D", "score": "2-2"},
            {"date": "2024-07-10", "opponent": "Local Club", "result": "W", "score": "2-0"}
        ],
        "upcoming_fixtures": [
            {"date": "2024-07-25", "opponent": "Top League Team", "competition": "League"},
            {"date": "2024-08-01", "opponent": "International Club", "competition": "Cup Final"}
        ]
    }
