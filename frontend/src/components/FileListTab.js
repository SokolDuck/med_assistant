import React, { useEffect, useState } from 'react';
import { List, Pagination, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function FileListTab() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchFiles();
  }, [currentPage]);
// }, [currentPage, pageSize]);

  const fetchFiles = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/files?page=${currentPage}&size=${10}`);
    setFiles(response.data);
  }

  const uploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BACKEND_URL}/api/files`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        fetchFiles();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <List
        dataSource={files}
        renderItem={file => (
          <List.Item>
            {file.original_filename}
          </List.Item>
        )}
      />
      
      <Pagination current={currentPage} total={files.length} onChange={(page, pageSize) => setCurrentPage(page)} />
    </>
  );
}
