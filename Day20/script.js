function image(ID, zero, one, two ,free)
{
  this.id = ID;
  this.fliped = false;
  this.borders = new Array(zero, one, two ,free);
  this.flip = function()
  {
    this.fliped = this.fliped == true ? false : true;
    [this.borders[0],this.borders[2]] = [this.borders[2],this.borders[0]];
    this.borders[0] = this.borders[0].split("").reverse().join("");
    this.borders[1] = this.borders[1].split("").reverse().join("");
    this.borders[2] = this.borders[2].split("").reverse().join("");
    this.borders[3] = this.borders[3].split("").reverse().join("");
  }
  this.rotate = function()
  {
    var temp = this.borders[0];
    this.borders[0] = this.borders[3];
    this.borders[3] = this.borders[2];
    this.borders[2] = this.borders[1];
    this.borders[1] = temp;
  }
  this.match = function(borderNumber, borderString, isFliped)
  {
    var thisBorderString = "";
    switch(borderNumber)
    {
      case 0: var thisBorderString = this.borders[2]; break;
      case 1: var thisBorderString = this.borders[3]; break;
      case 2: var thisBorderString = this.borders[0]; break;
      case 3: var thisBorderString = this.borders[1]; break;
    }
    /*if(this.fliped == isFliped)*/ thisBorderString = thisBorderString.split("").reverse().join("");
    return thisBorderString == borderString;
  }
  this.borderIsLike = function(borderNumber, matchString)
  {
    if(this.borders[borderNumber] == matchString ||
       this.borders[borderNumber] == matchString.split("").reverse().join(""))
       return true;
    else return false;
  }
}

var imagesTable = [];
var matchesInfo = [];

function part1(input_table)
{
  var elementId = -1;
  var upperBorder = "";
  var rightBorder = "";
  var bottomBorder = "";
  var leftBorder = "";
  var lastLine = "";
  for(var line of input_table)
  {
    if(line.includes("Tile"))
    {
      elementId = parseInt(line.split(" ")[1]);
    }
    else if(lastLine.includes("Tile"))
    {
      upperBorder = line;
      leftBorder = (leftBorder + line.split("")[0]);
      rightBorder = (rightBorder + line.split("").reverse()[0]);
    }
    else if(line == "")
    {
      bottomBorder = lastLine.split("").reverse().join("");
      leftBorder = leftBorder.split("").reverse().join("");
      imagesTable.push(new image(elementId, upperBorder, rightBorder, bottomBorder, leftBorder));
      elementId = -1;
      upperBorder = "";
      rightBorder = "";
      bottomBorder = "";
      leftBorder = "";
      lastLine = "";
    }
    else
    {
      leftBorder = (leftBorder + line.split("")[0]);
      rightBorder = (rightBorder + line.split("").reverse()[0]);
    }
    lastLine = line;
  }
  for(var compareImage of imagesTable)
  {
    for(var a = 0; a < 2; a++)
    {
      for(var b = 0; b < 4; b++)
      {
        for(var comparedImage of imagesTable)
        {
          if(comparedImage == compareImage) continue;
          for(var c = 0; c < 2; c++)
          {
            for(var d = 0; d < 4; d++)
            {
              if(comparedImage.match(0,
                                     compareImage.borders[0],
                                     compareImage.fliped))
              {
                if(matchesInfo.find(function(element){
                  if((compareImage.id == element[0] && comparedImage.id == element[4] ||
                     compareImage.id == element[4] && comparedImage.id == element[0])&&
                     (compareImage.borders[0] == element[1] || compareImage.borders[0] == element[5]))
                     return true;
                }) == null)
                matchesInfo.push(new Array(
                                          compareImage.id,
                                          compareImage.borders[0],
                                          0,
                                          compareImage.fliped,
                                          comparedImage.id,
                                          comparedImage.borders[2],
                                          2,
                                          comparedImage.fliped));
              }
              comparedImage.rotate()
            }
            comparedImage.flip();
          }
        }
        compareImage.rotate()
      }
      compareImage.flip();
    }
  }
  var value = 1;
  for(var img of imagesTable)
  {
    var number = matchesInfo.filter(function(element){
      if(element[0] == img.id || element[4] == img.id) return true;
    }).length;
    if(number == 2) value *= img.id;
  }
  //console.log(matchesInfo);
  console.log(imagesTable);
  return value;
}
function part2(input_table)
{
  var corner_elements = [];
  var images_map = [];
  var row_count = 12;
  var iterator = 0;
  for(var img of imagesTable)
  {
    var number = matchesInfo.filter(function(element){
      if(element[0] == img.id || element[4] == img.id) return true;
    });
    if(number.length == 2)
    {
      console.log(number);
      corner_elements.push(img.id);
    }
  }
  while(iterator < row_count)
  {
    var images_in_row = [];
    for(var a = 0; a < 12; a++)
    {
      if(iterator == 0 && a == 0)
      {
        var corner_element = imagesTable.find(function(element){
          return element.id == corner_elements[0];
        });
        console.log("before");
        console.log(corner_element);
        var matchedStrings = matchesInfo.filter(function(element){
          if(element[0] == corner_elements[0] || element[4] == corner_elements[0]) return true;
        }).map(function(element){
          if(element[0] == corner_elements[0]) return element[1];
          else return element[5];
        });
        console.log(matchedStrings);
        var inside_iter = 0;
        while(!(!(corner_element.borderIsLike(1,matchedStrings[0]) && corner_element.borderIsLike(2,matchedStrings[1])) ||
              !(corner_element.borderIsLike(1,matchedStrings[1]) && corner_element.borderIsLike(2,matchedStrings[0]))))
              {
                corner_element.rotate();
                ++inside_iter;
                if(inside_iter > 3)
                {
                  corner_element.flip();
                  inside_iter = 0;
                }
              }
        console.log("after");
        console.log(corner_element);
        images_in_row.push(corner_element.id);
      }
      else
      {
        var leftSide_image = imagesTable.find(function(element){
          return element.id == images_in_row[images_in_row.length-1];
        });
        var match_string = leftSide_image.borders[1];
        var actual_image_id = matchesInfo.filter(function(element)
        {
          if(element[0] == leftSide_image.id && leftSide_image.borderIsLike(1,element[1]) ||
             element[4] == leftSide_image.id && leftSide_image.borderIsLike(1,element[5]))
             return true;
          else return false;
        }).map(function(element){
          if(element[0] == leftSide_image.id) return element[4];
          else return element[0];
        });
        var actual_image = imagesTable.find(function(element){
          return element.id == actual_image_id;
        });
        console.log("before");
        console.log(actual_image);
        var inside_iter = 0;
        while(!actual_image.match(1,leftSide_image.borders[1],leftSide_image.fliped))
        {
          actual_image.rotate();
          ++inside_iter;
          if(inside_iter > 4)
          {
            inside_iter = 0;
            actual_image.flip();
          }
        }
        console.log("after");
        console.log(actual_image);
        images_in_row.push(actual_image.id);
      }
    }
    console.log(images_in_row);
    ++iterator;
  }
  console.log(corner_elements);
}
function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));

}
// 21:30

// part1 23:33

// part2 ...I surrender at 1:32. Code is ugly and not working on part2
