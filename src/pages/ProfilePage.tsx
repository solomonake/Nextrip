// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  UserPlus, UserCheck, Users, MoreHorizontal, Mountain, Award,
  Heart, MessageCircle, Camera
} from 'lucide-react';

interface Post {
  id: number;
  photo: string;
  description: string;
  activityType: string;
  likes: number;
  comments: number;
}

interface UserProfile {
  username: string;
  profilePic: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  likesReceived: number;
  tripsCompleted: number;
  missionsCompleted: number;
  isFollowing: boolean;
  posts: Post[];
}

export default function ProfilePage() {
  const { uid } = useParams<{ uid?: string }>();

  const dummyUser: UserProfile = {
    username: 'adventure_girl',
    profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
    bio: 'Explorer of mountains and cities 🌍',
    followersCount: 150,
    followingCount: 200,
    likesReceived: 320,
    tripsCompleted: 12,
    missionsCompleted: 8,
    isFollowing: false,
    posts: [
      {
        id: 1,
        photo: 'https://source.unsplash.com/random/300x200?nature',
        description: 'Amazing hike in the Alps!',
        activityType: 'Hike',
        likes: 45,
        comments: 12
      },
      {
        id: 2,
        photo: 'https://source.unsplash.com/random/300x200?travel',
        description: 'Exploring Tokyo streets 🗼',
        activityType: 'Discovery',
        likes: 67,
        comments: 23
      },
      {
        id: 3,
        photo: 'https://source.unsplash.com/random/300x200?mountain',
        description: 'Sunrise from the summit was incredible!',
        activityType: 'Mission',
        likes: 89,
        comments: 31
      }
    ]
  };

  const [user, setUser] = useState<UserProfile>(dummyUser);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [showCollabModal, setShowCollabModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!uid) {
        console.log('No UID provided → showing dummy user');
        return;
      }

      try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            username: data.username || '',
            profilePic: data.profilePic || '',
            bio: data.bio || '',
            followersCount: data.followersCount || 0,
            followingCount: data.followingCount || 0,
            likesReceived: data.likesReceived || 0,
            tripsCompleted: data.tripsCompleted || 0,
            missionsCompleted: data.missionsCompleted || 0,
            isFollowing: false,
            posts: data.posts || []
          });
        } else {
          console.log('User not found → showing dummy user');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [uid]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? `Unfollowed ${user.username}` : `Followed ${user.username}`);
  };

  const handleCollabRequest = () => {
    console.log(`Sent collab request to ${user.username}`);
    setShowCollabModal(false);
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Hike': return 'bg-green-100 text-green-800';
      case 'Mission': return 'bg-purple-100 text-purple-800';
      case 'Walk': return 'bg-blue-100 text-blue-800';
      case 'Discovery': return 'bg-orange-100 text-orange-800';
      case 'Adventure': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-16 mb-4">
              <img
                src={user.profilePic}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">@{user.username}</h1>
              <p className="text-gray-600 text-lg mb-4">{user.bio}</p>

              <div className="flex justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followersCount}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followingCount}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.likesReceived}</div>
                  <div className="text-sm text-gray-600">Likes</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center space-x-2">
                  <Mountain className="w-4 h-4" />
                  <span className="font-semibold">{user.tripsCompleted}</span>
                  <span className="text-sm">Trips</span>
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span className="font-semibold">{user.missionsCompleted}</span>
                  <span className="text-sm">Missions</span>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {isFollowing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>

                <button
                  onClick={() => setShowCollabModal(true)}
                  className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Ask for Collab</span>
                </button>

                <button className="bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Posts ({user.posts.length})
            </h2>
          </div>

          {user.posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">This user hasn't shared any adventures yet.</p>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.posts.map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={post.photo}
                      alt={post.description}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(post.activityType)}`}>
                        {post.activityType}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-gray-900 mb-3 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">View Post</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collab Modal */}
        {showCollabModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Send Collab Request</h3>
                <p className="text-gray-600">
                  Do you want to send a collab request to <span className="font-semibold">@{user.username}</span>?
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCollabModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCollabRequest}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
