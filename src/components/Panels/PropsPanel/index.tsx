import { DrawerProps, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import DrawerPanel from 'components/Base/DrawerPanel';

import tabStyles from 'components/Base/Tabs/index.module.scss';
import { MePropsLogs, OtherPropsLogs } from './propsline';


interface PropsPanelProps extends DrawerProps {
  onUserClick?: (id: string) => void;
}


const PropsPanel: React.FC<PropsPanelProps> = (props) => {

  const [active, setActive] = useState<string>("me")

  useEffect(() => {
    props.visible && setActive("me")
  }, [props.visible])

  return (
    <DrawerPanel
      {...props}
      bodyStyle={{ padding: "0px 9px" }}
      destroyOnClose
      title={
        <Tabs centered className={tabStyles.tabs} activeKey={active} onChange={setActive}>
          <Tabs.TabPane tab="对自己" key="me" />
          <Tabs.TabPane tab="对别人" key="other" />
        </Tabs>
      }
    >
      {active === "me" && <MePropsLogs onClick={props.onUserClick} />}
      {active === "other" && <OtherPropsLogs onClick={props.onUserClick} />}

    </DrawerPanel>
  )

}

export default PropsPanel;
