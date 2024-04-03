

export default function Leaves({statData}){
    // const statdata=[
    //     {
    //         "name": "maths",
    //         "percentage": 44,
    //         "bunks_available": 5
    //     },
    //     {
    //         "name": "English",
    //         "percentage": 94 ,
    //         "bunks_available": 10
    //     },
    // ]
    console.log("in LeavesLeft")
    return(
        <>
        <h2>Bunks Left</h2>
        <div style={{justifyContent:"center",}}>
        <div style={{backgroundColor:"#DDDDDD", display:"flex", flexWrap:"wrap", overflow:"auto", height:"300px", }}>
            {statData.map((key, value)=>(
                <div key={value} style={{backgroundColor:"white", marginLeft:"7px", marginTop:"7px", width:"162px", height:"182px", display:"flex", flexDirection:"column", borderRadius:"20px"}}>
                    <div style={{marginLeft:"8px", marginTop:"0px"}}>
                        {key.name}
                    </div>
                    <div style={{borderRadius:"50%", border:"5px solid", borderColor:"black", flex:"1", margin:"8px", justifyContent:"center", display:"flex", alignItems:"center", fontSize:"50px"}}>
                        {key.bunks_available}
                    </div>
                </div>
            ))}
        </div>
        </div>
        </>
        // <table style={{backgroundColor:"",}}>
                
        //         <tbody style={{backgroundColor:"", padding:"20px", width:"100%"}}>
                    
        //             {Object.keys(data).map((key, index) => (
        //                 <>
        //                 <tr style={{backgroundColor:"white", margin:"1px", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(100px,1fr))"}} key={index}>
        //                     <td style={{backgroundColor:"", paddingLeft:"10px"}}>{key}</td>
        //                     <td style={{backgroundColor:"", paddingRight:"10px", textAlign:"right"}}>{data[key]}</td>
        //                 </tr>
                        
        //                 </>
        //             ))}
                    
        //         </tbody>
        //     </table>
    )
}