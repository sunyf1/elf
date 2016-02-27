"use strict";
function save() {
    chrome.storage.sync.set({
        "rules": (()=> {
            let arr = [];
            $("#container tr").each((index, item)=> {
                arr.push({
                    "menu": $(item).find(".menu").text() || $(item).find(".menu input").val(),
                    "match": $(item).find(".match").text() || $(item).find(".match input").val(),
                    "target": $(item).find(".target").text() || $(item).find(".target input").val()
                });
            });
            return arr;
        })()
    }, ()=> {
        render();
    });
}
function render() {
    chrome.storage.sync.get("rules", items=> {
        $("#container").loadTemplate($("#label"), items.rules).on("mouseover", "tr", function () {//Toggle Delete Button
            $(this).find(".fa-times").show();
        }).on("mouseout", "tr", function () {
            $(this).find(".fa-times").hide();
        }).on("click", ".fa-times", function (event) {//Delete Inline Data
            $(this).parents("tr").fadeOut(500, function () {
                $(this).remove();
                save();
            });
            event.stopPropagation();
        }).on("click", ".menu,.match,.target", function (event) {
            let tr = $(this).parent("tr");
            tr.loadTemplate($("#input"), {
                "menu": tr.find(".menu").text() || tr.find(".menu .input-sm").val(),
                "match": tr.find(".match").text() || tr.find(".match .input-sm").val(),
                "target": tr.find(".target").text() || tr.find(".target .input-sm").val()
            }, {
                "complete": function () {
                    if (event.target.nodeName.toLowerCase() === "td") {
                        //trigger input get focus
                        $(this).find("." + $(event.target).attr("class") + " input").focus();
                    } else {
                        $(event.target).focus();
                    }
                }
            });
        }).on("click", "input", function (event) {
            event.stopPropagation();
        }).find(".fa-times").hide();
    });
}
$(()=> {
    render();
    //Loading Data
    $("#btnLoad").click(()=> {
        if ($("#txtConfig").val()) {
            $("#btnLoad").removeClass("fa-cloud-download").addClass("fa-spin fa-refresh");
            $.ajax($("#txtConfig").val()).done(data=> {
                chrome.storage.sync.get("rules", items=> {
                    chrome.storage.sync.set({
                        rules: (items && items.rules || []).concat(JSON.parse(data))
                    }, ()=> {
                        render();
                        $("#btnLoad").removeClass("fa-spin fa-refresh").addClass("fa-cloud-download");
                    });
                });
            });
        } else {
            alert("Invalid url");
        }
    });
    //Clear Storage
    $("#btnClear").click(()=> {
        chrome.storage.sync.clear(()=> {
            chrome.storage.sync.get("rules", ()=> {
                render();
            });
        });
    });

    var edit = "";
    //when mouse out of current <tr>
    $("#container").on("click","td",function(){
        var tr = $(this).closest('tr');
        var indexNow;
        if(edit){
            indexNow = tr.index()+"";
            if(edit == indexNow){
                if($(this).hasClass('no-edit-area')){
                    saveItem(edit);
                }
            }else{
                saveItem(edit);
                edit = indexNow;
            }
        }else{
            edit = tr.index()+"";
        }
    });

    function saveItem(index){
        chrome.storage.sync.get("rules", items=> {
            var data = items.rules;
            chrome.storage.sync.set({
                "rules": (()=> {
                    let arr = [];
                    $("#container tr").each((index, item)=> {
                        arr.push({
                            "menu": $(item).find(".menu input").val() || $(item).find(".menu").text()|| data[index].menu,
                            "match": $(item).find(".match input").val() || $(item).find(".match").text() || data[index].match,
                            "target": $(item).find(".target input").val() || $(item).find(".target").text() || data[index].target
                        });
                    });
                        return arr;
                    })()
                }, ()=> {
                    chrome.storage.sync.get("rules", items=> {
                        $("#container tr").eq(index).loadTemplate($("#label-item"), items.rules[index])
                    });
            });
        });
        
    }


    function checkInput(){
        //check all input finished
    }
});
//TODO:load default configuration on first install done, use chrome.extension.getURL("js/config.json"))
//TODO:add item function
//TODO:optimize ui
//TODO:drag drop order