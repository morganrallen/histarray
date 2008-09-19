var ha = new histarray('test');

test("new histarray('testV1')", function()
{
	ok(ha.length === 1, "new histarray('test').length == 1");
	ok(ha.revision == 0, "revision 0");
	ok(ha.revision == ha.revisions, 'end of timeline'); 
});

test("histarray.push", function()
{
	ha.push('testV2');
	ok(ha.revision == 1, 'revision 1 after push');
	ok(ha.revision == ha.revisions, 'end of timeline after end of timeline push');

	ha.push('testV3', 'test2V3');
	ok(ha.revision == 2, 'revision 2 after second push');
	ok(ha.length == 2, 'new element added');
});

test("histarray.nxt / histarray.prev", function()
{
	ok(ha.nxt == null, "no nxt at end of time");
	ok(ha.prev[0] == ha._elements[0][ha.revision - 1], "prev[0] matches");
	
	ha.revision = 0;

	ok(ha.prev == null, "no prev at revision 0");
	ok(ha.nxt[0] == ha._elements[0][ha.revision + 1], "nxt[0] matches");

	ha.revision++;

	ok(ha.prev != null, "prev set in mid-time");
	ok(ha.nxt != null, "nxt set in mid-time");

	ha.revision = ha.revisions;
});

test("histarray.pop()", function()
{
	var a = ha._elements[ha._elements.length - 1],
	l = ha.length;
	var b = ha.pop();
	ok(a[0] == b[0], "pop returned last element history");
	ok(b.length == ha.revisions + 1, "history size correct");
	ok(l - 1 == ha.length, "length correct");
});

test("histarray.splice()", function()
{
	ha.push('testV5', 'test3V5', 'test4V5', 'test5V5', 'test6V5');
	var a = [ ha._elements[2], ha._elements[3] ],
	l = ha.length,
	splicesize = 2;
	var b = ha.splice(2,splicesize);
	ok(a[ha.revisions] == b[ha.revisions] && a[0] == b[0], "splice returned correct histories");
	ok(b.length = ha.revisions + 1, "history size correct");
	ok(l - splicesize == ha.length, "length correct");
});


