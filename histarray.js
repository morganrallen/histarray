function histarray()
{
	for(var i = 0; i < arguments.length; i++)
		this._add(arguments[i], i);

	this.__defineSetter__('revision', function(v)
	{
		return (v > this.length) ?
			this.revision :
			this._revision = v;
	});
	this.__defineGetter__('revision', function()
	{
		return this._revision;
	});
	this.__defineGetter__('prev', function()
	{
		return (this.revision != 0) ?
			(function(self)
			{
				var a = Array();
				for(var i in self._elements)
					a.push(self._elements[i][self.revision - 1]);
				return a;
			})(this) :
			null;
	});
	this.__defineGetter__('nxt', function()
	{
		return (this.revision < this.revisions) ?
			(function(self)
			{
				var a = Array();
				for(var i in self._elements)
					a.push(self._elements[i][self.revision + 1]);
				return a;
			})(this) :
			null;
	});
};

histarray.prototype =
{
	length: 0,
	revisions: 0,
	_elements: Array(),
	_revision: 0,
	_add: function(e, i)
	{
		this._elements[i] = (function(e,self)
		{
			var a = Array();
			for(var i = 0; i < self.revisions; i++)
				a.push(null);
			a.push(e);
			return a;
		})(e,this);
		this.__defineGetter__(i, function()
		{
			return this._elements[i][this.revision];
		});

		this.__defineSetter__(i, function(v)
		{
			return this._elements[i][this.revision] = v;
		});
		this.length = i + 1;
	},
	_remove: function(i)
	{
	},
	// push csv or a single array
	push: function()
	{
		if(typeof arguments[0] == 'object')
			this.push.apply(this, arguments[0]);
		else
		{
			// at the end of the timeline, so push a new revision
			if(this.revision == this.revisions)
			{
				this.revision++;
				this.revisions++;
			}
			// otherwise just over write the current

			for(var i = 0; i < arguments.length; i++)
			{
				if(arguments[i] == null) continue;

				if(this._elements[i])
					this._elements[i][this.revision] = arguments[i];
				else
					this._add(arguments[i], i);
			}
		}
		return this.length;
	},
	pop: function()
	{
		var a = this._elements.pop();
		delete this[--this.length];
		return a;
	}
};
