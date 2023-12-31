import { useState } from 'react'
import './index.css'
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import InputForm from '../inputForm';

const ProductForm = ({ data, update,setModalOpen }) => {
    const [image, setImage] = useState([]);
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ file: newFile, fileList: newFileList }) => {
        setFileList(newFileList);
        (newFile.status === 'done') && setImage([...image, `http://localhost:5000/${newFile.response}`])
    };
    const uploadButton = (
        <div>
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
        <div className='productform'>
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
                 {update&& data.images.map((item)=>{
                    return(
                    <img src={item} alt="img" />
                    )
                })}
                </div>
            
            <InputForm images={image} fileList={fileList} setFileList={setFileList} setImage={setImage} data={data} update={update} setModalOpen={setModalOpen} />
        </div>
    )
}

export default ProductForm
