import { useState } from 'react'
import './index.css'
import { PlusOutlined } from '@ant-design/icons';
import { Upload,message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, postBanner, updateBanner } from '../../services/banner.service';
import { setBanner } from '../../features/userSlice';
function Bannner() {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Banner Updated!!',
            style:{marginTop:"10vh" , fontSize:"20px"}
        });
    };
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth.banner)
    const [fileList, setFileList] = useState([]);
    const [images, setImages] = useState([]);
    const handleChange = ({ file: newFile, fileList: newFileList }) => {
        setFileList(newFileList);
        (newFile.status === 'done') && setImages([...images, `http://localhost:5000/${newFile.response}`])
    };

    const handelUplode = async () => {
        try {
            const banner = await getBanner();
            if (banner.data.length === 0) {
                const res = await postBanner({ images });
                dispatch(setBanner(res.data))
            }
            else {
                const newBanner = await updateBanner(banner.data[0]._id, { images })
                dispatch(setBanner(newBanner.data))
            }
            success();
            setFileList([]);
            setImages([]);
        } catch (error) {
            console.log(error)
        }
    }

    const uploadButton = (
        <div>
            {contextHolder}
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <div className='editBanner'>

            <Upload
                action="http://localhost:5000/uploads"
                listType="picture-circle"
                fileList={fileList}
                onChange={handleChange}
                name='image'
                showUploadList={{ showPreviewIcon: false, showDownloadIcon: false, showRemoveIcon: false }}
            >
                {fileList.length >= 4 ? null : uploadButton}
            </Upload>

            <div className="prevImg">
                {data?.images.map((item) => {
                    return (
                        <img src={item} alt="img" />
                    )
                })}
            </div>

            {images.length !== 0 &&
                <button className='uplodeBtn' onClick={handelUplode} >Uplode</button>
            }
        </div>
    )
}

export default Bannner