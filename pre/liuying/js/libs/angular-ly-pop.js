/**
 * @author liuying
 * @version 0.8
 * @intro the pop layer to work with Jquery
 */

var lyLayer=function(model,data){
    $http.post('api/user',postData,config).success(function(data, status, headers, config) {
        layer.open({
            type:1,
            scrollbar:false,
            title:"������������",
            content:str
        });
    }).error(function(data, status, headers, config) {
        //�������
    });
};
