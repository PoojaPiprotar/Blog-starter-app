'use client'

// First blog that contains users list title with respective ids from given api for this time incorporating API data into the page.

import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import RenderLoading from '@/app/_components/loading';
import { BLOG_USER_ALBUM_URL, ERROR_DATA_TEXT, USER_BLOG_TITLE } from '@/lib/constants';
import getApiData from '@/lib/fetchapi';

const FirstBlog: NextPage = () => {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getApiData(BLOG_USER_ALBUM_URL);
            const { data, loading, err } = response;
            setAlbums(data);
            setLoading(loading);
            if (err) {
                console.error(ERROR_DATA_TEXT, err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4 text-black">{USER_BLOG_TITLE}</h1>
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <RenderLoading />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {albums.map((album: any) => (
                            <div key={album.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                                <h2 className="text-xl font-bold text-black">{album.title}</h2>
                                <p className="text-black">User ID: {album.userId}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FirstBlog;
