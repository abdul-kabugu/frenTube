//@ts-nocheck

import {
  generateVideoThumbnails,
  importFileandPreview,
} from '@rajesh896/video-thumbnails-generator'
import { useEffect, useRef, useState } from 'react'
//const contract = new Contract(window.ethereum)
import { LIVEPEER_KEY } from '@/assets/constant'
import { usePinToIpfs } from '@/hooks/usePinToIpfs'
//import { ClipLoader } from "react-spinners";
import { useSelectedMediaContext } from '@/context/MediaFormContext'
import useWindowSize from 'react-use/lib/useWindowSize'
import UpsertChatForm from '../community/UpsertChatForm'
import { ThumbnailsLoadingSpinner } from '../skeletons'
//import Confetti from 'react-confetti'
console.log(' lice peer key', LIVEPEER_KEY)
export default function VideoMetadata({ videoFile, setVideoFile }: any) {
  const [videoTitle, setvideoTitle] = useState('')
  const [caption, setcaption] = useState('')
  const [videoTags, setVideoTags] = useState([])
  const [videoTag, setvideoTag] = useState('')
  const [isSenstive, setisSensitive] = useState('no')
  const [videoThumnail, setvideoThumnail] = useState()
  const [selectedThumbnail, setselectedThumbnail] = useState()
  const [pointedThumbail, setpointedThumbail] = useState()
  const [isGeneratingThumbnails, setisGeneratingThumbnails] = useState(true)
  const [videoThumbnails, setvideoThumbnails] = useState([])
  const [videoUrl, setvideoUrl] = useState('')
  const [isUploadingCover, setisUploadingCover] = useState(false)
  const [isVideoUploading, setisVideoUploading] = useState(false)
  const [isCreatingNote, setisCreatingNote] = useState(false)
  const [trueTest, settrueTest] = useState(true)
  const [isNotCreated, setisNotCreated] = useState(false)
  const [isVideoUploaded, setisVideoUploaded] = useState()
  const [coverCID, setcoverCID] = useState()
  const [hubId, sethubId] = useState('1582')
  const { uploadToIpfs, isUploading, isUploadingError } = usePinToIpfs()
  const {
    selectedVideo,
    setSelectedVideo,
    selectedImage,
    setSelectedImage,
    selectedVideoCID,
    setselectedVideoCID,
    progressFormatted,
  } = useSelectedMediaContext()

  const { width, height } = useWindowSize()
  const [testTruth, settestTruth] = useState(true)

  const toggleTruthTest = () => {
    settrueTest(!trueTest)
  }

  const createPostProps = {
    hubId: hubId,
    onTxSuccess: () => {
      alert('video create succesfully')
    },
  }
  // const {postVideo} = usePostVideo()
  const selectThumbnailRef = useRef(null)
  // console.log("thumbnails ", videoThumbnails)
  //
  const addTag = (event: any) => {
    if (event.key === 'Enter' && videoTag.length > 1 && videoTags.length < 5) {
      setVideoTags([...videoTags, videoTag])
      setvideoTag('')
    }
  }

  //Remove  tag
  const removeTag = (index: any) => {
    setVideoTags([
      ...videoTags.filter((tags) => videoTags.indexOf(tags) !== index),
    ])
  }

  /*
   =========================
   UPLOD VIDEO THUMBNAIL
   ==========================
   */
  const handleUploadThumbnail = async () => {
    if (selectedThumbnail || videoThumbnails) {
      const base64ToBlob = (base64String, type) => {
        try {
          const byteCharacters = atob(base64String)
          const byteNumbers = new Array(byteCharacters.length)
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }
          const byteArray = new Uint8Array(byteNumbers)
          return new Blob([byteArray], { type: type })
        } catch (error) {
          if (error.name === 'InvalidCharacterError') {
            console.error('Invalid base64 string:', base64String)
            return null
          } else {
            throw error
          }
        }
      }

      // UPLOAD_VIDEO_COVER_TO_IPFS

      setisUploadingCover(true)
      const jpegBlob = base64ToBlob(
        selectedThumbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') ||
          videoThumbnails[0]?.replace(
            /^data:image\/(png|jpeg|jpg);base64,/,
            ''
          ),
        'image/png'
      )
      const videoCoverCID = await uploadToIpfs(jpegBlob)
      console.log('the image cid', videoCoverCID)
      setcoverCID(videoCoverCID?.path)
      setSelectedImage(videoCoverCID?.path)
      setisUploadingCover(false)
    }
  }

  useEffect(() => {
    handleUploadThumbnail()
  }, [selectedThumbnail, videoThumbnails])

  /* 
    ===============================
        END OF UPLOAD THUMBNAIL 
    ================================
    */

  /*
     ===============================
       GENERATE VIDEO  THUMBNAILS
     ==============================
     
     */

  useEffect(() => {
    if (videoFile) {
      importFileandPreview(videoFile).then((res) => {
        setvideoUrl(res)
      })
      generateVideoThumbnails(videoFile, 6)
        .then((res) => {
          setvideoThumbnails(res)
          setisGeneratingThumbnails(false)
          //setvidThunbnail(videoThumbnails[0])
        })
        .catch((error) => {
          alert(error)
        })
    }
  }, [videoFile])

  /*
     ===========================================
      END OF  GENERATE VIDEO  THUMBNAILS
     ========================================
     
     */

  /*
     ===============================
       RESET FORM FUNCTION
     ==============================
     
     */

  const handleReset = () => {
    setvideoTitle('')
    setcaption('')
    setVideoTags([])
    setVideoFile()
    setselectedThumbnail()
  }

  /*
     ===============================
       END OF RESET FUNCTION
     ==============================
     
     */

  /*
     ==================================
       LIVEPEER HOOK TO UPLOAD FILE
     ====================================
     
     */
  /*const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
    isLoading,
  } = useCreateAsset(
    videoFile
      ? {
          sources: [
            {
              name: selectedVideo.name,
              file: selectedVideo,
              storage: {
                ipfs: true,
                metadata: {
                  name: 'interesting video',
                  description: 'a great description of the video',
                },
              },
            },
          ] as const,
        }
      : null
  )

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting"
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  );

  setvideoProgress(progressFormatted)
  console.log('the progress of video', progressFormatted)
  console.log('the assets itsell', assets)
  console.log('is video uploading', selectedVideoCID)
  console.log('the uploading status', status)
  console.log('the error when posting', error) */

  /*  const handleUploadVideoFile = () =>  {
       if(! assets && ! selectedVideoCID && ! isLoading && selectedVideo){
        setisUploadingVideo(isLoading)
           createAsset?.()
           setselectedVideoCID(assets)
       }
    }

    useEffect(() => {
      handleUploadVideoFile()
    }, [selectedVideo, assets, isLoading])*/

  /*
     ===========================================
       END OF LIVEPEER HOOK TO UPLOAD FILE
     ===========================================
     
     */

  /*
     ===============================
       UPLOAD VIDEO FUNCTION
     ==============================
     */

  /*
     ===============================
       END UPLOAD VIDEO FUNCTION
     ==============================
     */
  /*
     ======================================
       POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */
  /*const handleCreateNote = async () => {

       
    try{
    setisCreatingNote(true);
    const result = await postNote.mutate({
      metadata : {
      title: videoTitle,
      content: caption,
      tags: videoTags,
      sources: ["xTube_v1"],
      attachments: [
        {
          name: coverCID,
          address: assets[0]?.playbackId,
          alt: videoTitle,
          mime_type: videoFile?.type,
        },
      ],
    }});
    console.log("the note results", result);

    setisNotCreated(true);
      setisCreatingNote(false);
      /* =====================
      TODO
       Direct  the  creator to  video  page
      ====================*/
  /*toast({
        title : "video uploaded",
        description : "video uploaded succefully "
      })

      
    } catch (error) {
       /* =====================
      TODO
      TOASTIFY THE ERROR
      ====================*/
  /* console.log("something went wrong while uploading the video ", error)
      toast({
        title : "someting went wrong",
        description : "something went wrong while uploading video"
      })
    }
  };*/

  /*useEffect(() => {
    if (status === "success" && !isNotCreated) {
      handleCreateNote();
    }
  }, [status]);*/

  /*
     ======================================
       END POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */

  /*
     ======================================
       GET CURRENT  UPLOADING STATE
     =======================================
     */
  const getCurrentUploadingState = () => {
    if (status === 'loading') {
      return 'Uploading Video'
    } else if (isCreatingNote) {
      return 'Posting Video'
    } else {
      return 'Post Video'
    }
  }

  /*
     ======================================
      END OF  GET CURRENT  UPLOADING STATE
     =======================================
     */

  return (
    <div className='  flex  items-center justify-center gap-3 xs:flex-col md:flex-row'>
      <div className='h-full  flex-1  px-3'>
        <div className='z-0  '>
          <video
            width={500}
            controls
            className='rounded-xl  '
            poster={selectedThumbnail}
          >
            <source src={URL.createObjectURL(videoFile)} />
          </video>
        </div>

        <div className='my-4 '>
          <h1 className='my-3 text-sm opacity-75'>THUMBNAILS</h1>
          <div className='flex flex-wrap gap-3'>
            <div className='flex h-[70px] w-[120px] flex-col items-center justify-center rounded-xl border border-gray-300'>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setvideoThumnail(e.target.files[0])}
                ref={selectThumbnailRef}
                hidden
              />
              {videoThumnail ? (
                <img
                  src={URL.createObjectURL(videoThumnail)}
                  className='h-[100%] w-[100%] rounded-md object-cover'
                />
              ) : (
                <>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 4.5v15m7.5-7.5h-15'
                      onClick={() => {
                        selectThumbnailRef.current.click()
                      }}
                    />
                  </svg>

                  <h1 className='text-xs opacity-60'>Upload</h1>
                </>
              )}
            </div>

            {isGeneratingThumbnails && (
              <div className='flex items-center gap-2'>
                {' '}
                {/* <ClipLoader size={19} /> <p>Loading Thambnails</p>{" "}*/}
                <ThumbnailsLoadingSpinner />
              </div>
            )}
            {videoThumbnails?.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`h-[70px] w-[120px] cursor-pointer rounded-xl ${
                    pointedThumbail === i && 'rounded-xl ring-2 ring-blue-700'
                  } relative `}
                  onClick={() => {
                    setselectedThumbnail(item)
                    setpointedThumbail(i)
                  }}
                >
                  <img
                    src={item}
                    key={i}
                    className='h-full w-full rounded-xl object-cover'
                  />
                  {/*<div>
                          <h1 className='absolute top-[50%] left-[50%] right-[50%]'>loading</h1>
                      </div>*/}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='h-full flex-1 px-4 py-2'>
        <UpsertChatForm {...createPostProps} />
      </div>
    </div>
  )
}
