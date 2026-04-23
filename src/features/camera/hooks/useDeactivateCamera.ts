import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCamera, useIsAssetExist } from '@/src/core/hooks/cameraHooks';

export const useDeactivateCamera = () => {
  const isAssetExist = useIsAssetExist();
  const { setActive } = useCamera('setActive');

  useFocusEffect(
    useCallback(() => {
      setActive(!isAssetExist);
      return () => {
        setActive(false);
      };
    }, [isAssetExist, setActive]),
  );
};
