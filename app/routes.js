/* Grab the model we created */
var multiPost = require('./models/multiPost');
var express = require('express');
    module.exports = function(app){
        var router = express.Router();
        router.use(function(req,res,next){
            console.log("something is happening");
            next();
        });
        
        router.get('/',function(req,res){
            res.json({message: 'Hooray!!'});
        });
        
        router.route('/allPosts')
            .post(function(req,res){
                var newPost = new multiPost();
                newPost.name = req.body[0].name;
                newPost.email = req.body[0].email;
                newPost.title=req.body[0].title;
                newPost.save(function(err){
                    if(err){
                        res.send(err);
                    }
                    res.json({message:"post created!!"});
                });
            })
            .get(function(req,res){
                return multiPost.find(function(err,allPosts){
                    if(err){
                        res.send(err);
                    }
                    console.log("#$$#",allPosts);
                    return res.json(allPosts);
                });
            });
        router.route('/allPosts/:post_id')
            .get(function(req,res){
                
                multiPost.findById(req.params.post_id, function(err,newPost){
                    if(err){
                        res.send(err);
                    }
                    console.log("in specific id function");
                    console.log("###",newPost);
                    return res.json(newPost);
                });
            })
            .put(function(req,res){
                console.log("inside the put function");
                console.log("#!!!!!!#", req.body);
                console.log("#&&&&&#", req.params);
               multiPost.findById(req.params.post_id,function(err,newPost){
                   if(err){
                       console.log("######" + "there was an error")
                       res.send(err);
                   }
                   
                   newPost.title = req.body.edit;
                   
                   newPost.save(function(err){
                       if(err){
                           res.send(err);
                       }
                       res.json({message:"Post updated!"});
                   });
               }); 
            })
            .delete(function(req,res){
                multiPost.remove({
                    _id: req.params.post_id
                }, function(err,newPost){
                    if(err){
                        res.send(err);
                    }
                    res.json({message:"deleted!"});
                });
            });
            
        app.use('/api',router);
        
    };