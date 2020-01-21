function createResult(error,data)
{
 const result={}

 if(error)
 {
     result['status']='error'
     result['error'] = error
 }

 else
 {
   result['status']='data'
   result['data']=data
 }

 return result

}

module.exports =
{
    createResult : createResult
}