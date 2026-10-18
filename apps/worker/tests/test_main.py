from nasdaq_worker.main import status


def test_status() -> None:
    assert status() == "nasdaq-worker ready"
