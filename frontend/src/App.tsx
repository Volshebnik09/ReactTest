import React, {useEffect} from 'react';
import {ParamEditor} from "./ParamEditor";

const App = () => {
  const paramEditorRef = React.useRef<ParamEditor>(null);

  return (
    <div>
      <ParamEditor
        ref={paramEditorRef}
        params={[
          {
            id: 1,
            name: 'Назначение',
            type: 'string',
          },
          {
            id: 2,
            name: 'Длина',
            type: 'string',
          },
        ]}
        model={{
          paramValues: [
            {
              paramId: 1,
              value: "повседневное"
            },
            {
              paramId: 2,
              value: "макси"
            },
            {
              paramId: 3,
              value: "2024-01-01"
            }
          ],
          colors: []
        }}
      />
      <button
        onClick={()=>{
          console.log(paramEditorRef.current?.getModel());
        }}
      >
        Сохранить
      </button>
    </div>
  );
};

export default App;