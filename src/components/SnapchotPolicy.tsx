// components/SnapshotPolicy.tsx
import { useState } from 'react';

const SnapshotPolicy: React.FC = () => {
  const [policyName, setPolicyName] = useState('ProjectX_Daily');
  const [directory, setDirectory] = useState('/Production/ProjectX');
  const [scheduleType, setScheduleType] = useState('Daily');
  const [time, setTime] = useState('07:00');
  const [days, setDays] = useState<string[]>(['Mon', 'Wed', 'Thu']);
  const [deleteAfter, setDeleteAfter] = useState('14');
  const [locked, setLocked] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Policy submitted:', {
      policyName,
      directory,
      scheduleType,
      time,
      days,
      deleteAfter,
      locked,
      enabled,
    });
  };

  const handleDayChange = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="bg-gray-900 p-8 rounded-md w-full max-w-6xl mr-auto">
      <h2 className="text-white text-2xl font-semibold mb-6">
        Edit Snapshot Policy
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Policy Name */}
        <div className="space-y-1">
          <label className="block text-sm text-gray-300">Policy Name</label>
          <input
            type="text"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Apply to Directory */}
        <div className="space-y-1">
          <label className="block text-sm text-gray-300">
            Apply to Directory
          </label>
          <input
            type="text"
            value={directory}
            onChange={(e) => setDirectory(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Run Policy on the Following Schedule */}
        <div className="space-y-4">
          <label className="block text-sm text-gray-300">
            Run Policy on the Following Schedule
          </label>
          <div className=" bg-gray-800 p-4">
            {/* Schedule Type */}
            <div className="space-y-1 mb-3">
              <label className="block text-sm text-gray-300">
                Select Schedule Type
              </label>
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            {/* Time Zone */}
            <div className="space-y-1 my-3">
              <label className="block text-sm text-gray-300">
                Set to Time Zone
              </label>
              <input
                type="text"
                value="America/Los Angeles"
                className="w-full p-2 bg-gray-700 text-gray-400 rounded-md border border-gray-600"
                disabled
              />
            </div>
            {/* Snapshot Time */}
            <div className="space-y-1 my-3">
              <label className="block text-sm text-gray-300">
                Take a Snapshot at
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Day Selection */}
            <div className="space-y-1 my-3">
              <label className="block text-sm text-gray-300">
                On the Following Day(s)
              </label>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                  (day) => (
                    <label
                      key={day}
                      className="flex items-center text-gray-300 space-x-1"
                    >
                      <input
                        type="checkbox"
                        value={day}
                        checked={days.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span>{day}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            {/* Deletion Policy */}
            <div className="space-y-1 my-3">
              <label className="block text-sm text-gray-300">
                Delete Each Snapshot
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-300 space-x-2">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="Never"
                    checked={deleteAfter === 'Never'}
                    onChange={() => setDeleteAfter('Never')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span>Never</span>
                </label>
                <label className="flex items-center text-gray-300 space-x-2 my-3">
                  <input
                    type="radio"
                    name="deleteOption"
                    value="After"
                    checked={deleteAfter !== 'Never'}
                    onChange={() => setDeleteAfter('14')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span>Automatically after</span>
                  <input
                    type="number"
                    min="1"
                    value={deleteAfter !== 'Never' ? deleteAfter : ''}
                    onChange={(e) => setDeleteAfter(e.target.value)}
                    className="ml-2 w-16 p-1 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
                    disabled={deleteAfter === 'Never'}
                  />
                  <span>day(s)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Snapshot Locking Section */}
        <div className="mt-4">
          <h3 className="text-sm text-gray-300">Snapshot Locking</h3>
          <p className="text-xs text-gray-400 mb-2">
            Locked snapshots cannot be deleted before the deletion schedule
            expires. For this feature to be available, snapshots must be set to
            automatically delete.
          </p>
          <label className="flex items-center text-gray-300 space-x-2">
            <input
              type="checkbox"
              checked={locked}
              onChange={() => setLocked(!locked)}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span>Enable locked snapshots</span>
          </label>
        </div>

        {/* Enable Policy */}
        <div className="mt-4">
          <label className="flex items-center text-gray-300 space-x-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span>Enable policy</span>
          </label>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save Policy
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnapshotPolicy;
