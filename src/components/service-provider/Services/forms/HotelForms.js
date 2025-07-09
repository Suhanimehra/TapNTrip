import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
import { FaSave, FaTimes } from 'react-icons/fa';

export const RoomForm = ({ room, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    capacity: '',
<<<<<<< HEAD
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
=======
    beds: '',
    size: '',
    description: '',
    amenities: '',
    roomNumber: '',
    floor: '',
    image: '',
    status: 'available'
  });
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || '',
        type: room.type || '',
        price: room.price || '',
        capacity: room.capacity || '',
<<<<<<< HEAD
        image: room.image || '',
      });
      setImagePreview(room.image || '');
=======
        beds: room.beds || '',
        size: room.size || '',
        description: room.description || '',
        amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities || '',
        roomNumber: room.roomNumber || '',
        floor: room.floor || '',
        image: room.image || '',
        status: room.status || 'available'
      });
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

<<<<<<< HEAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;
    if (imageFile) {
      const storage = getStorage();
      const imageRef = ref(storage, `room_images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }
    onSubmit({ ...formData, image: imageUrl });
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };

    if (dataToSubmit.amenities) {
      dataToSubmit.amenities = dataToSubmit.amenities.split(',').map(item => item.trim()).filter(item => item !== '');
    } else {
      dataToSubmit.amenities = [];
    }

    onSubmit(dataToSubmit);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl overflow-y-auto max-h-[calc(100vh-16rem)] border border-gray-200 dark:border-gray-700">
      <h3 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6">Room Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="roomName" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Room Name</label>
          <input
            type="text"
            id="roomName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
<<<<<<< HEAD
=======

>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
        <div>
          <label htmlFor="roomType" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Room Type</label>
          <select
            id="roomType"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          >
            <option value="">Select Type</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Family Room">Family Room</option>
          </select>
        </div>
<<<<<<< HEAD
=======

>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Price per Night</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
<<<<<<< HEAD
=======

>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
        <div>
          <label htmlFor="capacity" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
<<<<<<< HEAD
        <div className="col-span-full">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Room Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 rounded-lg max-h-40 object-contain border" />
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"><FaTimes /> Cancel</button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><FaSave /> Save</button>
=======

        <div>
          <label htmlFor="beds" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Number of Beds</label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Size (sqft)</label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
          rows="3"
          placeholder="e.g., A spacious room with a view of the city skyline, equipped with modern amenities..."
        />
      </div>

      <div className="col-span-full">
        <label htmlFor="amenities" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Amenities (comma-separated)</label>
        <textarea
          id="amenities"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
          rows="2"
          placeholder="e.g., Free WiFi, Minibar, Smart TV, Balcony"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="floor" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Floor</label>
          <input
            type="number"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="image" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
          placeholder="e.g., https://example.com/room-image.jpg"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
        >
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          <FaTimes className="inline-block mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
        >
          <FaSave className="inline-block mr-2" />
          Save
        </button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      </div>
    </form>
  );
};

<<<<<<< HEAD
export const PackageForm = ({ pkg, onSubmit, onCancel, providerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    inclusions: '',
    exclusions: '',
    images: [],
    status: 'active',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name || '',
        description: pkg.description || '',
        price: pkg.price || '',
        duration: pkg.duration || '',
        inclusions: pkg.inclusions || '',
        exclusions: pkg.exclusions || '',
        images: pkg.images || [],
        status: pkg.status || 'active',
      });
      setImagePreviews(pkg.images || []);
    }
  }, [pkg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrls = formData.images;
    if (imageFiles.length > 0) {
      const storage = getStorage();
      imageUrls = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `package_images/${Date.now()}_${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }
    }
    onSubmit({
      ...formData,
      images: imageUrls,
      providerId,
    });
=======
export const FacilityForm = ({ facility, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    capacity: '',
    operatingHours: '',
    image: '',
    status: 'available'
  });

  useEffect(() => {
    if (facility) {
      setFormData({
        name: facility.name || '',
        type: facility.type || '',
        description: facility.description || '',
        capacity: facility.capacity || '',
        operatingHours: facility.operatingHours || '',
        image: facility.image || '',
        status: facility.status || 'available'
      });
    }
  }, [facility]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl overflow-y-auto max-h-[calc(100vh-16rem)] border border-gray-200 dark:border-gray-700">
<<<<<<< HEAD
      <h3 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6">Package Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="packageName" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Package Name</label>
          <input
            type="text"
            id="packageName"
=======
      <h3 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6">Facility Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="facilityName" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Facility Name</label>
          <input
            type="text"
            id="facilityName"
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
=======

        <div>
          <label htmlFor="facilityType" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Facility Type</label>
          <select
            id="facilityType"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          >
            <option value="">Select Type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Pool">Pool</option>
            <option value="Gym">Gym</option>
            <option value="Spa">Spa</option>
            <option value="Conference Room">Conference Room</option>
          </select>
        </div>

>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
        <div className="col-span-full">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
<<<<<<< HEAD
            rows={3}
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <div className="col-span-full">
          <label htmlFor="inclusions" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Inclusions</label>
          <textarea
            id="inclusions"
            name="inclusions"
            value={formData.inclusions}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            rows={2}
            required
          />
        </div>
        <div className="col-span-full">
          <label htmlFor="exclusions" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Exclusions</label>
          <textarea
            id="exclusions"
            name="exclusions"
            value={formData.exclusions}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            rows={2}
            required
          />
        </div>
        <div className="col-span-full">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Package Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" className="rounded-lg max-h-24 object-contain border" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"><FaTimes /> Cancel</button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><FaSave /> Save</button>
=======
            rows="3"
            placeholder="e.g., A state-of-the-art fitness center with modern equipment and expert trainers..."
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="operatingHours" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Operating Hours</label>
          <input
            type="text"
            id="operatingHours"
            name="operatingHours"
            value={formData.operatingHours}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
            placeholder="e.g., 9:00 AM - 10:00 PM"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="image" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
          placeholder="e.g., https://example.com/facility-image.jpg"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200 ease-in-out text-base"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          <FaTimes className="inline-block mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
        >
          <FaSave className="inline-block mr-2" />
          Save
        </button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      </div>
    </form>
  );
}; 