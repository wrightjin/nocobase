import { LayoutOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { PluginManager } from '../plugin-manager';

export const SchemaTemplateShortcut = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [style, setStyle] = useSetState({});

  const pathname = '/admin/block-templates';

  useEffect(() => {
    setStyle(location.pathname.startsWith(pathname) ? { backgroundColor: '#f18b62' } : { backgroundColor: null });
  }, [location.pathname]);
  const history = useHistory();
  return (
    <PluginManager.Toolbar.Item
      style={style}
      icon={<LayoutOutlined />}
      title={t('Block templates')}
      onClick={() => {
        history.push(pathname);
      }}
    />
  );
};
