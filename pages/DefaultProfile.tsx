import React from 'react';
import { ViewProfile } from './ViewProfile';
import { DEFAULT_PROFILE } from '../types';

/**
 * Trang hiển thị profile mặc định - không cho phép chỉnh sửa
 * Sử dụng dữ liệu từ DEFAULT_PROFILE
 */
export const DefaultProfile: React.FC = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 flex items-start justify-center">
      <ViewProfile data={DEFAULT_PROFILE} isPreview={true} />
    </div>
  );
};

