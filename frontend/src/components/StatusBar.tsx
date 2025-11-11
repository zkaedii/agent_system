import { useState } from 'react';
import { FaTrophy, FaStar, FaCode, FaFire } from 'react-icons/fa';
import { useStore } from '../store/useStore';

export const StatusBar: React.FC = () => {
  const { userStats } = useStore();
  const [showRewards, setShowRewards] = useState(false);

  const xpToNextLevel = 1000;
  const xpProgress = (userStats.xp % xpToNextLevel) / xpToNextLevel * 100;

  const unlockedAchievements = userStats.achievements.filter(a => a.unlocked);

  return (
    <>
      <div className="h-6 bg-dark-panel border-t border-dark-border flex items-center justify-between px-3 text-xs text-gray-400">
        {/* Left side - Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaCode size={12} />
            <span>{userStats.linesOfCode.toLocaleString()} lines</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Files: {userStats.filesEdited}</span>
          </div>
        </div>

        {/* Right side - XP & Level */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRewards(!showRewards)}
            className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer"
          >
            <FaTrophy className="text-yellow-400" size={12} />
            <span>{unlockedAchievements.length} Achievements</span>
          </button>

          <div className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer group">
            <FaStar className="text-primary-400" size={12} />
            <span className="font-semibold">Level {userStats.level}</span>
            <div className="w-24 h-1.5 bg-dark-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <span>{userStats.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Rewards Modal */}
      {showRewards && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowRewards(false)}
        >
          <div
            className="bg-dark-panel border border-dark-border rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Your Achievements
              </h2>
              <button
                onClick={() => setShowRewards(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-bg rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-400">
                  Level {userStats.level}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {userStats.xp.toLocaleString()} Total XP
                </div>
                <div className="w-full h-2 bg-dark-panel rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
              <div className="bg-dark-bg rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">
                  <FaCode className="inline mr-1" />
                  {userStats.linesOfCode.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">Lines of Code</div>
              </div>
            </div>

            {/* Achievements List */}
            <div className="space-y-3">
              {userStats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-primary-900/20 border-primary-600'
                      : 'bg-dark-bg border-dark-border opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-200">
                          {achievement.title}
                        </h3>
                        {achievement.unlocked && (
                          <FaFire className="text-orange-400" size={14} />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {achievement.description}
                      </p>
                      {achievement.progress !== undefined && (
                        <div className="mt-2">
                          <div className="w-full h-1 bg-dark-panel rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500"
                              style={{
                                width: `${
                                  (achievement.progress / (achievement.maxProgress || 1)) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {achievement.progress} / {achievement.maxProgress}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
