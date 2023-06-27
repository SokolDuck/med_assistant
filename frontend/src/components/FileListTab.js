import React, { useEffect, useState } from 'react';
import { List, Pagination, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getFileList, FILES_UPLOAD_URL, getAuthHeaders } from '../resources/Server';



export default function FileListTab() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filesCount, setFilesCount] = useState(0);

  useEffect(() => {
    fetchFiles();
  // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const fetchFiles = async () => {
    const response = await getFileList(currentPage, pageSize);
    setFiles(response.data.files);
    setFilesCount(response.data.files_counts);
  }

  const uploadProps = {
    name: 'file',
    action: FILES_UPLOAD_URL,
    headers:  getAuthHeaders(),
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
      
      <Pagination 
        current={currentPage}
        total={filesCount}
        onChange={(page, ps) => { setCurrentPage(page); setPageSize(ps);} } 
        defaultPageSize={10}
      />
    </>
  );
}
