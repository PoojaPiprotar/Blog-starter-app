'use client'

// nextjs_skills : Demo of image rendering with various api and other URls using next image componet. 
import { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import cn from "classnames";
import { NextPage } from 'next';

import getApiData from '@/lib/fetchapi';
import {
  ALT_IMAGE_TEXT,
  BLOG_ALBUM_URL,
  COVER_IMAGE_URL,
  DUMMY_TEXT,
  ERROR_DATA_TEXT,
  EXPLORE_IMAGE_TEXT,
  FETCH_IMAGE_BUTTON_TEXT,
  IMAGE_DETAIL_DESC_TEXT,
  IMAGE_SCROLL_DESC_TEXT,
  LIST_IMAGE_TEXT
} from '@/lib/constants';
import RenderLoading from '@/app/_components/loading';
import { Photo } from '@/interfaces/next-skills';

const NextjsSkillsPage: NextPage = () => {
  const [image, setImage] = useState<string>('');
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  // Function to fetch any reandom image from api. 
  const fetchImages = useCallback(async (id?: string) => {

    const response = await getApiData(BLOG_ALBUM_URL);
    const { data, loading, err } = response;

    // Pick an image at random from the API.
    const randomIndex = Math.floor(Math.random() * data.length);
    const imageUrl = data[randomIndex].url;
    setImage(imageUrl);

    // check list of images will not update every time when button clicked. 
    // setImages state chages only once when 1st time api call only.
    if (!id) {
      const firstTenImages = data.slice(0, 10).map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      }));
      setImages(firstTenImages);
    }
    setLoading(loading);

    if (err) {
      console.error(ERROR_DATA_TEXT, err);
    }
  }, []);

  useEffect(() => {
    fetchImages()
  }, [])

  const handleButtonClick = useCallback(() => {
    fetchImages(DUMMY_TEXT);
  }, [fetchImages]);

  const memoizedImage = useMemo(() => {
    return image ? (
      <div className="max-w-full">
        <Image src={image} alt="Random Image" width={600} height={400} className="rounded-lg" />
      </div>
    ) : null;
  }, [image]);

  // Implemented on click on list of images to show any specific image
  const handleClick = (imageUrl: string) => {
    setImage(imageUrl)
  };

  const renderLoading = () => (
    <RenderLoading />
  );

  return (
    <div className="container mx-auto mt-8 overflow-scroll mx-auto px-5">
      <h2 className="text-3xl font-bold mb-4 text-center">{EXPLORE_IMAGE_TEXT}</h2>

      {/* Incorporate the nextjs image component onto the page with an image of your choice. (pick one from pixabay.com) */}
      {/* Cover Image as per point a. Image taken from pixabay.com to render */}
      <Image
        src={COVER_IMAGE_URL}
        alt={ALT_IMAGE_TEXT}
        className={cn("shadow-sm w-full", {
          "hover:shadow-lg transition-shadow duration-200": ALT_IMAGE_TEXT,
        })}
        width={1300}
        height={630}
      />
      <div className="text-center mb-4 mt-5">
        <h2 className="text-2xl font-bold">{LIST_IMAGE_TEXT}</h2>

        {/* Note : Images taken to render in horizontal scrollview from api fetch to show various images render demo. */}
        {/* Various image rendering modes with multiple images. */}
        <p className="text-gray-500">{IMAGE_SCROLL_DESC_TEXT}</p>
      </div>
      <div className="flex overflow-x-auto space-x-4 min-w-full mb-4 p-10">
        {loading && renderLoading()}  {/* To show progess to user that api call */}
        {images.map((photo) => (
          <div key={photo.id} className="flex-shrink-0 w-48 lg:w-64" onClick={() => handleClick(photo.url)}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <Image src={photo.url} alt={photo.title} width={250} height={150} className="rounded-t-lg" />
              <p className="mt-2 text-sm text-center line-clamp-2">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 mb-10 max-w-md mx-auto bg-gray-100 p-8 rounded-lg shadow-md" >

        {/* Image in any rendom image will dispay very first time */}
        <div className="mb-6">{memoizedImage}</div>
        <p className="text-center text-gray-600 mb-6">{IMAGE_DETAIL_DESC_TEXT}</p>

        {/* Handle random image switches */}
        {/* Each time a user clicks the button the image will change. */}
        <button
          onClick={handleButtonClick}
          className="bg-black text-white font-bold py-2 px-4 block mx-auto hover:bg-white hover:text-black hover:border-black hover:border-2 transition duration-300"
        >
          {FETCH_IMAGE_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
};

export default NextjsSkillsPage;
