function calcVal(subtable)
{
  var newSubtable = [];
  var countedVal = null;
  var operator = "";
    for(var a = 0; a < subtable.length;a++)
    {
      if(isNaN(parseInt(subtable[a])))
      {
        if(a == 0)
        {
          newSubtable = subtable;
          break;
        }
        else if(a+1 == subtable.length)
        {
          if(a+1 == subtable.length) newSubtable.push(countedVal);
          newSubtable.push(subtable[a]);
          continue;
        }
        else operator = subtable[a];
      }
      else
      {
        if(countedVal == null) countedVal = parseInt(subtable[a]);
        else
        {
          switch (operator) {
            case "*": countedVal *= parseInt(subtable[a]); break;
            case "+": countedVal += parseInt(subtable[a]); break;
          }
        }
        if(a+1 == subtable.length) newSubtable.push(countedVal);
      }
    }
  return newSubtable;
}
function subVal2(line)
{
  while(line.indexOf("(") != -1)
  {
    var start = line.indexOf("(");
    var fromIndex = start;
    var counter = 1;
    var end = 0;
    while(counter > 0)
    {
      var end1 = line.indexOf("(",fromIndex+1);
      var end2 = line.indexOf(")",fromIndex+1);

      if(end2 > end1 && end1 != -1)
      {
        ++counter;
        fromIndex = end1;
      }
      else
      {
        --counter;
        end = end2;
        fromIndex = end2;
      }

    }
    //var end = line.lastIndexOf(")");
    var replacesubstr = line.substr(start,end-start+1);
    var substr = line.substr(start+1, (end-start)-1);
    var valOfSubstr = subVal2(substr);
    line = line.replace(replacesubstr,""+valOfSubstr);
  }
  while(line.indexOf("+") != -1)
  {
    var index = line.indexOf("+");
    var start = line.lastIndexOf(" ",index-2);
    var end = line.indexOf(" ",index+2);
    if(end == -1) end = line.length;
    var replacesubstr = line.substr(start+1,end-start-1)
    var valOfSubstr = calcVal(replacesubstr.split(" ")).join("");
    line = line.replace(replacesubstr,""+valOfSubstr);
  }
  var returnVal = calcVal(line.split(" ")).join("");
  return returnVal;
}

function subVal(line)
{
  while(line.indexOf("(") != -1)
  {
    var start = line.indexOf("(");
    var fromIndex = start;
    var counter = 1;
    var end = 0;
    while(counter > 0)
    {
      var end1 = line.indexOf("(",fromIndex+1);
      var end2 = line.indexOf(")",fromIndex+1);

      if(end2 > end1 && end1 != -1)
      {
        ++counter;
        fromIndex = end1;
      }
      else
      {
        --counter;
        end = end2;
        fromIndex = end2;
      }

    }
    //var end = line.lastIndexOf(")");
    var replacesubstr = line.substr(start,end-start+1);
    var substr = line.substr(start+1, (end-start)-1);
    var valOfSubstr = subVal(substr);
    line = line.replace(replacesubstr,""+valOfSubstr);
  }
  var returnVal = calcVal(line.split(" ")).join("");
  return returnVal;
}

function part1(input_table)
{
  var sum = 0;
  for(var line of input_table)
  {
    var returnVal = subVal(line);
    sum += parseInt(returnVal);
    //console.log(returnVal);
  }
  return sum;
}
function part2(input_table)
{
  var sum = 0;
  for(var line of input_table)
  {
    var returnVal = subVal2(line);
    sum += parseInt(returnVal);
    //console.log(returnVal);
  }
  return sum;
}
function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));

}
// 21:59

// part1 00:21

// part2 00:54

//nah, so many problems with function that extract subequation from brackets. That stole a lot of time
