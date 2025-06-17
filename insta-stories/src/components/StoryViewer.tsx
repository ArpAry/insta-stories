import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./StoryViewer.css"; // Add this to include the animation CSS

type StoryCarouselProps = {
  storiesData: UserStories[];
  onUserSelect: (userIndex: number) => void;
};

type Story = {
  type: "image" | "video";
  url: string;
  duration?: number;
};

type UserStories = {
  userId: number;
  username: string;
  stories: Story[];
};

const StoryCarousel: React.FC<StoryCarouselProps> = ({
  storiesData,
  onUserSelect,
}) => {
  return (
    <div className="flex space-x-4 overflow-x-auto px-4 py-2 border-black  border-[3px] justify-self-center">
      {storiesData.map((user, index) => (
        <div
          key={user.userId}
          onClick={() => onUserSelect(index)}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden">
            <img
              src={`https://i.pravatar.cc/150?u=${user.userId}`}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white text-xs mt-1">{user.username}</span>
        </div>
      ))}
    </div>
  );
};

const storiesData: UserStories[] = [
  {
    userId: 1,
    username: "nature_lover",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
        duration: 5000,
      },
    ],
  },
  {
    userId: 2,
    username: "urban_vibes",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        duration: 5000,
      },
      {
        type: "video",
        url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
    ],
  },
  {
    userId: 3,
    username: "foodie_journey",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        duration: 5000,
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
    ],
  },
  {
    userId: 4,
    username: "beauty_lover",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
        duration: 5000,
      },
    ],
  },
  {
    userId: 5,
    username: "rural_vibes",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        duration: 5000,
      },
      {
        type: "video",
        url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
    ],
  },
  {
    userId: 6,
    username: "happy_journey",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        duration: 5000,
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
    ],
  },
  {
    userId: 7,
    username: "vlogger",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
        duration: 5000,
      },
    ],
  },
  {
    userId: 8,
    username: "happy_vibes",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        duration: 5000,
      },
      {
        type: "video",
        url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
    ],
  },
  {
    userId: 9,
    username: "full_of_love",
    stories: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        duration: 5000,
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        duration: 5000,
      },
    ],
  },
];

const StoryViewer: React.FC = () => {
  const [userIndex, setUserIndex] = useState<number | null>(null);
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStory =
    userIndex !== null ? storiesData[userIndex]?.stories[storyIndex] : null;

  useEffect(() => {
    if (currentStory?.type === "image") {
      timerRef.current = setTimeout(() => {
        goToNextStory();
      }, currentStory.duration || 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [userIndex, storyIndex]);

  useEffect(() => {
    setVideoProgress(0);
  }, [userIndex, storyIndex]);

  const goToNextStory = () => {
    if (userIndex === null) return;
    const currentUser = storiesData[userIndex];
    if (storyIndex + 1 < currentUser.stories.length) {
      setStoryIndex((prev) => prev + 1);
    } else if (userIndex + 1 < storiesData.length) {
      setUserIndex((prev) => (prev ?? 0) + 1);
      setStoryIndex(0);
    } else {
      setUserIndex(null);
    }
  };

  const goToPrevStory = () => {
    if (storyIndex > 0) {
      setStoryIndex((prev) => prev - 1);
    } else if (userIndex && userIndex > 0) {
      const prevUserStories = storiesData[userIndex - 1].stories;
      setUserIndex(userIndex - 1);
      setStoryIndex(prevUserStories.length - 1);
    }
  };

  const handleVideoEnd = () => {
    goToNextStory();
  };

  return (
    <div className="bg-gold min-h-screen text-white">
      <div
        style={{
          fontSize: "2rem",
          color: "black",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Welocome to Story Viewers 🎉
      </div>

      <div
        style={{
          fontSize: "1rem",
          color: "black",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        By Arpit Arya
      </div>
      <StoryCarousel
        storiesData={storiesData}
        onUserSelect={(i) => {
          setUserIndex(i);
          setStoryIndex(0);
        }}
      />

      {userIndex !== null && currentStory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-20">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-xl z-30"
            onClick={() => setUserIndex(null)}
          >
            ✕
          </button>

          {/* Left thumbnail */}
          <div
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-30 ${
              userIndex <= 0
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (userIndex > 0) {
                setUserIndex(userIndex - 1);
                setStoryIndex(0);
              }
            }}
          >
            {userIndex > 0 && (
              <img
                src={`https://i.pravatar.cc/150?u=${
                  storiesData[userIndex - 1]?.userId
                }`}
                alt="Prev user"
                className="w-40 h-40 rounded-full border-2 border-white"
              />
            )}
          </div>

          {/* Right thumbnail */}
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-30 ${
              userIndex >= storiesData.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (userIndex < storiesData.length - 1) {
                setUserIndex(userIndex + 1);
                setStoryIndex(0);
              }
            }}
          >
            {userIndex < storiesData.length - 1 && (
              <img
                src={`https://i.pravatar.cc/150?u=${
                  storiesData[userIndex + 1]?.userId
                }`}
                alt="Next user"
                className="w-40 h-40 rounded-full border-2 border-white"
              />
            )}
          </div>

          <div className="relative w-full max-w-md h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
            {/* Username */}
            <div className="absolute top-2 left-2 text-sm font-semibold z-10 decoration-red-50">
              {storiesData[userIndex].username}
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-10 flex overflow-hidden">
              {storiesData[userIndex].stories.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full ${
                    idx === storyIndex ? "bg-white" : "bg-gray-500"
                  }`}
                  style={{
                    flex: 1,
                    marginRight:
                      idx !== storiesData[userIndex].stories.length - 1 ? 2 : 0,
                    opacity: idx <= storyIndex ? 1 : 0.3,
                    animation:
                      idx === storyIndex && currentStory.type === "image"
                        ? `progress ${
                            currentStory.duration || 5000
                          }ms linear forwards`
                        : undefined,
                    transformOrigin: "left",
                  }}
                />
              ))}
            </div>

            {/* Media */}
            <div className="h-full w-full flex items-center justify-center">
              {currentStory.type === "image" ? (
                <img
                  src={currentStory.url}
                  alt="story"
                  className="object-cover w-full h-full"
                />
              ) : (
                <ReactPlayer
                  url={currentStory.url}
                  playing
                  controls={false}
                  width="100%"
                  height="100%"
                  onEnded={handleVideoEnd}
                  onProgress={({ played }) => setVideoProgress(played)}
                />
              )}
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <button
                onClick={goToPrevStory}
                className="bg-black/40 text-xl px-2 py-1 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={goToNextStory}
                className="bg-black/40 text-xl px-2 py-1 rounded-full"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
