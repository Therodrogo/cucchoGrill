import React from 'react';

import { Button } from '@nextui-org/react';

function App() {
    return (
        <>
            <div style={{position:"fixed", paddingTop:"25px",paddingBottom:"25px", paddingLeft:"10px", width: "100%", height: "40px", background: "#DDBD8C", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <Button style={{position:"absolute"}} variant='bordered' color='primario' radius='full' isIconOnly>
                    <span class="material-icons-outlined">
                        arrow_back
                    </span>
                </Button>
                <p style={{textAlign:"center",width:"100%"}}>Selecione sus promociones</p>
            </div>

            <div style={{marginTop:"50px"}}>

                Conteido
            </div>


        </>

    );
}

export default App;