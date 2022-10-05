/*
 * @FilePath: /mog-admin/src/hooks/useSetting.ts
 * @author: Wibus
 * @Date: 2022-10-05 15:06:49
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:08:59
 * Coding With IU
 */
import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';



const useSettings = () => useContext(SettingsContext);

export default useSettings;
