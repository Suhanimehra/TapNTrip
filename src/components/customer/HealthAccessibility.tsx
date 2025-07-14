import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdDelete, MdSave, MdContactEmergency, MdHealthAndSafety, MdAccessibility, MdWheelchairPickup, MdHearing, MdVisibility, MdTextFields } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getHealthProfile, saveHealthProfile } from '../../services/firestoreService';
import { useAuth } from '../../contexts/AuthContext';

const cardClass =
  'bg-[#1F2937] rounded-2xl shadow-lg p-6 mb-8 flex flex-col gap-4 transition-all duration-300';
const cardTitleClass =
  'flex items-center gap-2 text-xl md:text-2xl font-semibold text-purple-400 mb-4';
const labelClasses =
  'block text-sm font-medium text-gray-300 mb-1';
const tagInputClasses =
  'flex flex-wrap gap-2 border border-gray-700 rounded-lg px-2 py-2 bg-[#111827]';
const tagClasses =
  'bg-purple-900 text-purple-200 px-3 py-1 rounded-full flex items-center gap-1 text-sm';
const toggleBtnClass =
  'flex flex-col items-center justify-center px-4 py-3 rounded-xl bg-[#111827] border-2 border-gray-700 text-gray-300 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200';
const toggleBtnActive =
  'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg';
const selectClasses =
  'ml-2 px-3 py-2 rounded-lg border border-gray-700 bg-[#111827] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500';

const HealthAccessibility = () => {
  // Emergency Contacts
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '', phone: '' },
    { name: '', phone: '' },
    { name: '', phone: '' },
  ]);
  // Medical Info (tags)
  const [medicalInfo, setMedicalInfo] = useState({
    conditions: [],
    allergies: [],
    medications: [],
  });
  const [tagInput, setTagInput] = useState({
    conditions: '',
    allergies: '',
    medications: '',
  });
  // Accessibility Preferences
  const [accessPrefs, setAccessPrefs] = useState({
    wheelchair: false,
    largeText: false,
    hearingAid: false,
    visualAssist: false,
    fontSize: 'medium',
    colorblindMode: false,
  });
  // Save button state
  const [isChanged, setIsChanged] = useState(false);
  const saveBtnRef = useRef(null);
  const { user } = useAuth() as unknown as { user: any };

  useEffect(() => {
    setIsChanged(true);
  }, [emergencyContacts, medicalInfo, accessPrefs]);

  useEffect(() => {
    if (user) {
      getHealthProfile().then(data => {
        if (data.emergencyContacts) setEmergencyContacts(data.emergencyContacts);
        if (data.medicalInfo) setMedicalInfo(data.medicalInfo);
        if (data.accessPrefs) setAccessPrefs({ ...accessPrefs, ...data.accessPrefs });
      }).catch(() => {
        // No saved profile, skip
      });
    }
    // eslint-disable-next-line
  }, [user]);

  // Emergency Contacts Handlers
  const handleContactChange = (idx, field, value) => {
    const updated = [...emergencyContacts];
    updated[idx][field] = value;
    setEmergencyContacts(updated);
  };
  const addContact = () => {
    if (emergencyContacts.length < 5) {
      setEmergencyContacts([...emergencyContacts, { name: '', phone: '' }]);
    }
  };
  const removeContact = idx => {
    if (emergencyContacts.length > 3) {
      setEmergencyContacts(emergencyContacts.filter((_, i) => i !== idx));
    }
  };

  // Tag Input Handlers
  const handleTagInputChange = (type, value) => {
    setTagInput({ ...tagInput, [type]: value });
  };
  const handleTagInputKeyDown = (type, e) => {
    if ((e.key === 'Enter' || e.key === ',' || e.key === 'Tab') && tagInput[type].trim()) {
      e.preventDefault();
      if (!medicalInfo[type].includes(tagInput[type].trim())) {
        setMedicalInfo({
          ...medicalInfo,
          [type]: [...medicalInfo[type], tagInput[type].trim()],
        });
        setTagInput({ ...tagInput, [type]: '' });
      }
    }
  };
  const removeTag = (type, idx) => {
    setMedicalInfo({
      ...medicalInfo,
      [type]: medicalInfo[type].filter((_, i) => i !== idx),
    });
  };

  // Accessibility Prefs Handlers
  const handleToggle = (field) => {
    setAccessPrefs({ ...accessPrefs, [field]: !accessPrefs[field] });
  };
  const handleFontSizeChange = (e) => {
    setAccessPrefs({ ...accessPrefs, fontSize: e.target.value });
  };

  // Add these helper functions at the top of the component:
  const filterNameInput = (value: string) => value.replace(/[^A-Za-z\s]/g, '').slice(0, 50);
  const filterMobileInput = (value: string) => value.replace(/[^\d]/g, '').slice(0, 10);

  // Save Handler
  const handleSave = async (e) => {
    e.preventDefault();
    setIsChanged(false);
    try {
      await saveHealthProfile({
        emergencyContacts,
        medicalInfo,
        accessPrefs,
      });
      toast.success('Health & Accessibility info saved!', { position: 'bottom-center' });
    } catch (err) {
      toast.error('Failed to save health info', { position: 'bottom-center' });
    }
  };

  // Accessibility toggles config
  const accessibilityOptions = [
    {
      key: 'wheelchair',
      icon: <MdWheelchairPickup className="text-2xl mb-1" />,
      label: 'Wheelchair Access',
      tooltip: 'Accessible for wheelchair users',
    },
    {
      key: 'largeText',
      icon: <MdTextFields className="text-2xl mb-1" />,
      label: 'Large Text',
      tooltip: 'Enable large text for readability',
    },
    {
      key: 'hearingAid',
      icon: <MdHearing className="text-2xl mb-1" />,
      label: 'Hearing Aid Compatible',
      tooltip: 'Compatible with hearing aids',
    },
    {
      key: 'visualAssist',
      icon: <MdVisibility className="text-2xl mb-1" />,
      label: 'Visual Assistance',
      tooltip: 'Visual assistance features',
    },
    {
      key: 'colorblindMode',
      icon: <span className="text-2xl mb-1">🎨</span>,
      label: 'Colorblind Mode',
      tooltip: 'Enable colorblind-friendly colors',
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-8 pb-32">
      <h2 className="text-3xl font-semibold mb-8 text-indigo-400 flex items-center gap-3">
        <MdHealthAndSafety className="text-4xl" /> Health & Accessibility
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Contacts Card */}
        <div className={cardClass}>
          <div className={cardTitleClass}>
            <MdContactEmergency className="text-2xl" /> Emergency Contacts
          </div>
          <div className="flex flex-col gap-3">
            {emergencyContacts.map((c, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-3 items-center">
                <input
                  type="text"
                  value={c.name}
                  onChange={e => handleContactChange(idx, 'name', filterNameInput(e.target.value))}
                  onBlur={e => handleContactChange(idx, 'name', filterNameInput(e.target.value))}
                  placeholder="Name"
                  maxLength={50}
                  pattern="[A-Za-z\s]{2,50}"
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                  required
                  aria-label={`Contact Name ${idx + 1}`}
                />
                <input
                  type="tel"
                  value={c.phone}
                  onChange={e => handleContactChange(idx, 'phone', filterMobileInput(e.target.value))}
                  onBlur={e => handleContactChange(idx, 'phone', filterMobileInput(e.target.value))}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                  required
                  aria-label={`Contact Phone ${idx + 1}`}
                />
                {emergencyContacts.length > 3 && (
                  <button
                    type="button"
                    onClick={() => removeContact(idx)}
                    className="text-red-400 hover:text-red-600 p-2 rounded-full"
                    aria-label="Remove Contact"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addContact}
              className="flex items-center gap-2 text-indigo-300 hover:text-white font-medium mt-2 self-start px-3 py-1 rounded-lg bg-[#111827] hover:bg-purple-900 transition-all"
              disabled={emergencyContacts.length >= 5}
            >
              <MdAdd /> Add Contact
            </button>
          </div>
        </div>

        {/* Medical Info Card */}
        <div className={cardClass}>
          <div className={cardTitleClass}>
            <MdHealthAndSafety className="text-2xl" /> Health Details
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Medical Conditions */}
            <div>
              <label className={labelClasses}>Medical Conditions</label>
              <div className={tagInputClasses}>
                {medicalInfo.conditions.map((tag, idx) => (
                  <span key={idx} className={tagClasses}>
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-purple-200 hover:text-red-400"
                      onClick={() => removeTag('conditions', idx)}
                      aria-label="Remove Condition"
                    >
                      <MdDelete size={16} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput.conditions}
                  onChange={e => handleTagInputChange('conditions', e.target.value)}
                  onKeyDown={e => handleTagInputKeyDown('conditions', e)}
                  placeholder="Add condition"
                  className="flex-1 bg-transparent outline-none min-w-[100px] text-white"
                  aria-label="Add Medical Condition"
                />
              </div>
            </div>
            {/* Allergies */}
            <div>
              <label className={labelClasses}>Allergies</label>
              <div className={tagInputClasses}>
                {medicalInfo.allergies.map((tag, idx) => (
                  <span key={idx} className={tagClasses}>
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-purple-200 hover:text-red-400"
                      onClick={() => removeTag('allergies', idx)}
                      aria-label="Remove Allergy"
                    >
                      <MdDelete size={16} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput.allergies}
                  onChange={e => handleTagInputChange('allergies', e.target.value)}
                  onKeyDown={e => handleTagInputKeyDown('allergies', e)}
                  placeholder="Add allergy"
                  className="flex-1 bg-transparent outline-none min-w-[100px] text-white"
                  aria-label="Add Allergy"
                />
              </div>
            </div>
            {/* Medications */}
            <div>
              <label className={labelClasses}>Medications</label>
              <div className={tagInputClasses}>
                {medicalInfo.medications.map((tag, idx) => (
                  <span key={idx} className={tagClasses}>
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-purple-200 hover:text-red-400"
                      onClick={() => removeTag('medications', idx)}
                      aria-label="Remove Medication"
                    >
                      <MdDelete size={16} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput.medications}
                  onChange={e => handleTagInputChange('medications', e.target.value)}
                  onKeyDown={e => handleTagInputKeyDown('medications', e)}
                  placeholder="Add medication"
                  className="flex-1 bg-transparent outline-none min-w-[100px] text-white"
                  aria-label="Add Medication"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Preferences Card */}
        <div className={cardClass}>
          <div className={cardTitleClass}>
            <MdAccessibility className="text-2xl" /> Accessibility Preferences
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-3 md:space-x-3">
              {accessibilityOptions.map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  className={toggleBtnClass + (accessPrefs[opt.key] ? ' ' + toggleBtnActive : '')}
                  onClick={() => handleToggle(opt.key)}
                  aria-label={opt.tooltip}
                  title={opt.tooltip}
                >
                  {opt.icon}
                  <span className="text-xs mt-1 font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="text-gray-300 font-medium">Text Size:</label>
              <select
                value={accessPrefs.fontSize}
                onChange={handleFontSizeChange}
                className={selectClasses}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <button
        ref={saveBtnRef}
        type="button"
        onClick={handleSave}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all duration-200
          bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-transparent min-h-[64px]
          ${!isChanged ? 'opacity-60 pointer-events-none' : 'hover:from-purple-600 hover:to-pink-600'}
        `}
        disabled={!isChanged}
        aria-disabled={!isChanged}
        style={{ zIndex: 60 }}
      >
        <MdSave className="text-2xl" /> Save Settings
      </button>
    </div>
  );
};

export default HealthAccessibility; 