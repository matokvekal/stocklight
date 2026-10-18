"""Worker entry point. Real data fetching arrives in a later phase."""


def status() -> str:
    return "nasdaq-worker ready"


def main() -> None:
    print(status())


if __name__ == "__main__":
    main()
